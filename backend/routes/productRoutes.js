import express from 'express'
import { getAllProductsAdmin, getAllProducts, getProduct, createProduct, findAndUpdateProduct, findAndDeleteProduct, createProductReview, deleteReview, getProductReviews } from '../controllers/productController.js';
import { protect, authroles } from '../Middleware/authMiddleware.js';
const router = express.Router();
// admin routes start
router.route('/products-admin').get(protect, authroles("Admin" || "admin"), getAllProductsAdmin);
router.route('/products/new').post(protect, authroles("Admin" || "admin"), createProduct);
// admin routes end

// public routes start
router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getProduct).put(protect, findAndUpdateProduct).delete(protect, findAndDeleteProduct);
router.route('/product/review').put(protect, createProductReview);
router.route('/product/reviews').get(getProductReviews).delete(protect, deleteReview);
// public routes end
export default router;