import asyncHandler from 'express-async-handler'
import User from '../modals/userModals.js'
import Product from '../modals/productModal.js'


//@desc Update user cartItems
// route Post /api/add-to-cart
// @acess public
const addToCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const productDetails = await Product.findById(req.body.cartProductId);

    if (!user) {
        res.status(404).json({ success: false, message: 'Log In to save.' });
        throw new Error('Log In to save.');
    }
    let existingCartItemIndex = user.cartItems.findIndex(item => item._id.toString() === productDetails._id.toString());
    if (existingCartItemIndex !== -1) {
        user.cartItems[existingCartItemIndex].quantity += 1;
        user.markModified('cartItems');
    } else {
        const productWithQuantity = {
            ...productDetails.toObject(),
            quantity: 1
        };
        user.cartItems.push(productWithQuantity);
        user.markModified('cartItems');
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "Product Added to Cart.",
        cartItems: user.cartItems
    });
});

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
// route Post /api/removecartItem
// @acess public
const removecartitems = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Log In to get items.' });
    }

    const itemIndex = user.cartItems.findIndex(item => item._id.toString() === req.body.cartProductId);
    if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: 'Item not found in cart.' });
    }

    user.cartItems.splice(itemIndex, 1);
    await user.save();
    res.status(200).json({ success: true, message: "Removed cart item.", cartItems: user.cartItems });
});

//@desc remove user cartItems
// route Post /api/updateCart
// @acess private
// ===================================================================================================================
const updateCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const productDetails = await Product.findById(req.body.cartProductId);
    if (!user) {
        res.status(404).json({ success: false, message: 'Log In to save.' });
        throw new Error('Log In to save.');
    }
    let existingCartItemIndex = user.cartItems.findIndex(item => item._id.toString() === productDetails._id.toString());
    if (existingCartItemIndex !== -1) {
        switch (req.body.action) {
            case 'increment':
                user.cartItems[existingCartItemIndex].quantity += 1;
                break;
            case 'decrement':
                user.cartItems[existingCartItemIndex].quantity -= 1;
                if (user.cartItems[existingCartItemIndex].quantity <= 0) {
                    user.cartItems.splice(existingCartItemIndex, 1);
                }
                break;
            case 'remove':
                user.cartItems.splice(existingCartItemIndex, 1);
                break;
            default:
                throw new Error('Invalid action');
        }
        user.markModified('cartItems');
    } else {
        const productWithQuantity = {
            ...productDetails.toObject(),
            quantity: req.body.quantity || 1
        };
        user.cartItems.push(productWithQuantity);
        user.markModified('cartItems');
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "Cart Updated.",
        cartItems: user.cartItems
    });
});

// ===================================================================================================================

export { addToCart, getcartitems, removecartitems, updateCart };