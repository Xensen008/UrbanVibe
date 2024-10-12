import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
    try{
       if(!req.headers.authorization){
        return next(createError(401, "You are not authenticated"));
       }
       const token = req.headers.authorization.split(" ")[1];
       if(!token) return next(createError(401, "You are not authenticated"));
       const decoded = jwt.verify(token, process.env.JWT_KEY);
       req.user = decoded;
       next();
    }catch(err){
        next(err);
    }   
};

