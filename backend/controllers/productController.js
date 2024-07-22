import Product from '../modals/productModal.js'
import asyncHandler from 'express-async-handler'
import ApiFeatures from '../utils/apiFeatures.js';

//@desc create Product
// route Post /api/products/new
// @access Private
const createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({ sucess: true, message: "Products created.", product })
})

//@desc Get All Products for admin
// route GET /api/products-Admin
// @access Private
const getAllProductsAdmin = asyncHandler(async (req, res) => {
    const limitPerPage = process.env.LimitPerPage;
    const productCount = await Product.countDocuments();
    const searchProducts = new ApiFeatures(Product.find(), req.query).search().filter().pagination(limitPerPage);
    const products = await searchProducts.query;
    res.status(200).json({ sucess: true, TotalProducts: productCount, message: "All Products Fetched.", products });
})
//@desc Get All Products
// route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
    const limitPerPage = process.env.LimitPerPage;
    const productCount = await Product.countDocuments();
    const searchProducts = new ApiFeatures(Product.find(), req.query).search().filter().pagination(limitPerPage);
    const products = await searchProducts.query;
    if (products.length !== 0) {
        res.status(200).json({ success: true, message: "All Products Fetched.", products });
    } else {
        res.status(200).json({ success: false, message: "No Products similar to query.", products });
    }
})
//@desc Get product
// route GET /api/product/:id
// @acess Private
const getProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json(
            {
                sucess: false,
                message: "Product Not found."
            }
        )
    }
    res.status(200).json({ sucess: true, message: "Products Fetched.", product })
})
//@desc update Product
// route get /api/products/:id
// @access Private
const findAndUpdateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json(
            {
                sucess: false,
                message: "Product Not found."
            }
        )
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ sucess: true, message: "Products Fetched and updated.", product });
})
//@desc delete Product
// route get /api/products/:id
// @access Private
const findAndDeleteProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json(
            {
                sucess: false,
                message: "Product Not found."
            }
        )
    }
    await Product.deleteOne();
    res.status(200).json({ sucess: true, message: "Products deleted sucessfully." });
})
//@desc create product review
// route POST /api/product/review
// @acess Public
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, productId, comment } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        isReviewed.rating = rating;
        isReviewed.comment = comment;
    } else {
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = parseFloat((avg / product.reviews.length).toFixed(1));
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Review Added."
    });
})
//@desc get product review
// route POST /api/product/review
// @acess Public
const getProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return res.status(404).json(
            {
                sucess: false,
                message: "Product Not found."
            }
        )
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});
const deleteReview = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return res.status(404).json(
            {
                sucess: false,
                message: "Product Not found."
            }
        )
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const noOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            noOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        message: "Review Updated."
    });
});
export { getAllProductsAdmin, getAllProducts, createProduct, getProduct, findAndUpdateProduct, findAndDeleteProduct, createProductReview, getProductReviews, deleteReview };