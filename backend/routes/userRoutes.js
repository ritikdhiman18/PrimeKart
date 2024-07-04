import express from 'express'
import { authUser, resisterUser, logoutUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import { protect } from '../Middleware/authMiddleware.js';
const router = express.Router();
router.post('/', resisterUser);
router.post('/auth', authUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
export default router;