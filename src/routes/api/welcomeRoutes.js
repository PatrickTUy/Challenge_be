import express from 'express';
import { welcomeController } from '../../controllers/welcomeController.js';

const route = express.Router();
route.get('/', welcomeController);
export default route;
