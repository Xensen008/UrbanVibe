import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.model.js";
import Orders from "../Models/Order.model.js";
import { createError } from "../error.js";

dotenv.config();

// User Register
export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, imageUrl } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            name, 
            img: imageUrl 
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        res.status(201).json({ message: "User created successfully", user: newUser, token });

    } catch (err) {
        next(err);
    }
}

export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        const isEmailCorrect = user.email === email;
        if (!isPasswordCorrect) return next(createError(400, "Wrong credentials"));
        if (!isEmailCorrect) return next(createError(400, "Wrong email"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        next(err);
    }
}

// Add to cart
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);
        const existingCartItemIndex = user.cart.findIndex((item) => item.product.equals(productId));
        if (existingCartItemIndex !== -1) {
            user.cart[existingCartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();
        res.status(200).json({ message: "Item added to cart successfully", user });
    } catch (error) {
        next(error)
    }
}

// Remove from cart
export const removeFromCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const userJWT = req.user;
      const user = await User.findById(userJWT.id);
      if (!user) {
        return next(createError(404, "User not found"));
      }
      const productIndex = user.cart.findIndex((item) =>
        item.product.equals(productId)
      );
      if (productIndex !== -1) {
        if (quantity && quantity > 0) {
          user.cart[productIndex].quantity -= quantity;
          if (user.cart[productIndex].quantity <= 0) {
            user.cart.splice(productIndex, 1);
          }
        } else {
          user.cart.splice(productIndex, 1);
        }
  
        await user.save();
        return res
          .status(200)
          .json({ message: "Product quantity updated in cart", user });
      } else {
        return next(createError(404, "Product not found in the user's cart"));
      }
    } catch (err) {
      next(err);
    }
};

export const getAllCartItems = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Products",
    });
    const cartItems = user.cart;
    return res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    const { products, address, totalAmount } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const order = new Orders({
      user: user._id,
      products,
      address,
      total_amount: totalAmount
    });
    await order.save();

    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Order placed successfully", order });  
  } catch (error) {
    next(error);
  }
};


export const getAllOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await Orders.find({ user: user.id });
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};


//cancel orders
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Orders.findById(orderId);
    if(!order) return next(createError(404, "Order not found"));
    order.status = "cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    next(error);
  }
}



export const addToFavourite = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);

        if (!user.favourites.includes(productId)) {
            user.favourites.push(productId);
            await user.save();
        }
        res.status(200).json({ message: "Product added to favourite successfully", user });
    } catch (error) {
        next(error);
    } 
}


//remove from favourite

export const removeFromFavourite = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);

        user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
        await user.save();
        res.status(200).json({ message: "Product removed from favourite successfully", user });
    } catch (error) {
        next(error);
    }
} 

// get user favourite

export const getUserFavourite = async (req, res, next) => {
    try {
       const userId = req.user.id;
       const user = await User.findById(userId).populate("favourites");

       if(!user) return next(createError(404, "User not found"));
       res.status(200).json({ message: "Favourite products fetched successfully", favourites: user.favourites });
    } catch (error) {
        next(error);
    } 
}
