import express from 'express'
import { authroles, protect } from '../Middleware/authMiddleware.js';
import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js"
const router = express.Router();
router.route('/order/new').post(protect, newOrder);
router.route('/order/:id').get(protect, authroles("Admin" || "admin"), getSingleOrder);
router.route('/orders/myorders').get(protect, myOrders);
router.route('/admin/orders').get(protect, authroles("Admin" || "admin"), getAllOrders);
router.route('/admin/order/:id').get(protect, authroles("Admin" || "admin"), updateOrder).delete(protect, authroles("Admin" || "admin"), deleteOrder);

export default router;