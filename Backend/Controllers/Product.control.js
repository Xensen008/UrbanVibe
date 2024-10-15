import mongoose from "mongoose";
import Product from "../models/Product.model.js";
import { createError } from "../error.js";

export const addProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        if(!Array.isArray(productData)) {
            return next(createError(400, "Invalid Request, Expected an array of products"));
        }
        const createdProducts = []
        for (const productInfo of productData) {
            const { title, name, desc, img, price, sizes, category } = productInfo;
            const newProduct = new Product({ title, name, desc, img, price: { org: price }, sizes, category });
            const savedProduct = await newProduct.save();
            createdProducts.push(savedProduct);
        }
        res.status(201).json({ message: "Products added successfully", products: createdProducts });
    } catch (err) {
        next(err);
    }
}

//get Products
export const getproducts = async (req, res, next) => {
    try {
        const { categories, minPrice, maxPrice, sizes, search } = req.query;
        let filter = {};

        if (categories) {
            filter.category = { $in: categories.split(",") };
        }

        if (minPrice || maxPrice) {
            filter["price.org"] = {};
            if (minPrice) filter["price.org"].$gte = parseFloat(minPrice);
            if (maxPrice) filter["price.org"].$lte = parseFloat(maxPrice);
        }

        if (sizes) {
            filter.sizes = { $in: sizes.split(",") };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } }
            ];
        }

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        console.error("Backend error:", error);
        next(error);
    }
};


export const getProductById = async (req, res, next) => {
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id)){
            return next(createError(404, "Invalid Product ID"));
        }
        const product = await Product.findById(id);
        if(!product){
            return next(createError(404, "Product not found"));
        }
        res.status(200).json(product);  
    }catch(error){
        next(error)
    }
}
