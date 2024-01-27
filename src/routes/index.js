import express from 'express';
import welcomeRoutes from './api/welcomeRoutes.js';
import userRoutes from './api/userRoutes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);

export default routes;
