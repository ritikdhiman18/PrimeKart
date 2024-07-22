import express from 'express'
import { authUser, resisterUser, logoutUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword } from '../controllers/userControllers.js';
const router = express.Router();
router.post('/', resisterUser);
router.post('/auth', authUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
export default router;