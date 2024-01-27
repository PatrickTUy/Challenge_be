import express from 'express';
import { UserControllers } from '../../controllers/userControllers.js';
const router = express.Router();

const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);
// router.delete('/:email', userControllers.deleteUser)

export default router;
