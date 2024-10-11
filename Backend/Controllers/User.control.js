import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.model.js";
import Order from "../Models/Order.model.js";
import { createError } from "../error.js";

dotenv.config();
 
// User Register
export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash password with generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword, name, img });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        res.status(201).json({ message: "User created successfully", user: newUser, token });

    } catch (err) {
        next(err);
    }
}

export const UserLogin = async (req, res, next )=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return next(createError(400, "Wrong credentials"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        next(err);
    }
}