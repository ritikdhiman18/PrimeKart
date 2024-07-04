import asyncHandler from 'express-async-handler'
import User from '../modals/userModals.js'
import Product from '../modals/productModal.js'


//@desc Update user cartItems
// route Post /api/add-to-cart
// @acess public
const addToCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.body.cartProductId);
    if (user) {
        user.cartItems.push(product)
        await user.save();
        res.status(200).json({
            success: true,
            message: "Product Added to Cart."
        });
    } else {
        res.status(404);
        throw new Error('Log In to save.');
    }
})
//@desc get user cartItems
// route Post /api/cartItems
// @acess public
const getcartitems = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const items = user.cartItems;
        res.status(200).json({
            success: true,
            message: "Cart items fetched.",
            items
        });
    } else {
        res.status(404);
        throw new Error('Log In to get items.');
    }
})
//@desc remove user cartItems
// route Post /api/cartItems
// @acess public
const removecartitems = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const items = user.cartItems;
    const item = user.cartItems.findById(req.body.cartProductId);
    if (user) {
        items.pop(item)
        await user.save();
        res.status(200).json({
            success: true,
            message: "Removed cart item.",
            items
        });
    } else {
        res.status(404);
        throw new Error('Log In to get items.');
    }
})
export { addToCart, getcartitems, removecartitems };