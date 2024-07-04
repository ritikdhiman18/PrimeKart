import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from '../modals/userModals.js'
import { Error } from "mongoose";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch {
            res.status(401);
            throw new Error('Not Authorized, Invalid token.');
        }

    } else {
        res.status(401);
        throw new Error('Not Authorized, No token.');
    }
});

export const authroles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(500);
            throw new Error(`Role: ${req.user.role} is not allowed to access the resource.`)
        }
        next()
    }
};
