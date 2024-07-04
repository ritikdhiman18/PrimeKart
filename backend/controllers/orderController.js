import Order from '../modals/orderModal.js'
import Product from '../modals/productModal.js'
import asyncHandler from 'express-async-handler'

//@desc create Product Order
// route Post /api/order/new
// @access Private
const newOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

//@desc get single Order
// route Post /api/order/:id
// @access Private
const getSingleOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this Id"
        });
    }

    res.status(200).json({
        success: true,
        order,
    });
});

//@desc my Order
// route POST /api/orders/myorders
// @access Private
const myOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

//@desc get all Order
// route Post /api/order/
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// update Order Status -- Admin
const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this Id"
        });
    }

    if (order.orderStatus === "Delivered") {
        return res.status(404).json({
            success: false,
            message: "You have already delivered this order."
        });
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this Id."
        });
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});
export { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, updateStock, deleteOrder };