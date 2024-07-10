import express from 'express'
import { getHomeScreen } from '../controllers/homeScreenController.js';
const router = express.Router();
router.get('/', getHomeScreen);
export default router;