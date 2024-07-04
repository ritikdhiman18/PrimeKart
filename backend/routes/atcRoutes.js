import express from 'express'
import { protect } from '../Middleware/authMiddleware.js';
import { addToCart, getcartitems } from '../controllers/atcController.js';
const router = express.Router();

router.route('/add-to-cart').post(protect, addToCart);
router.route('/cartItems').get(protect, getcartitems);

export default router;