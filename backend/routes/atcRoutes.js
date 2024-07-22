import express from 'express'
import { protect } from '../Middleware/authMiddleware.js';
import { addToCart, getcartitems, removecartitems, updateCart } from '../controllers/atcController.js';
const router = express.Router();

router.route('/add-to-cart').post(protect, addToCart);
router.route('/updateCart').post(protect, updateCart);
router.route('/cartItems').get(protect, getcartitems);
// router.route('/removecartItem').delete(protect, removecartitems);

export default router;