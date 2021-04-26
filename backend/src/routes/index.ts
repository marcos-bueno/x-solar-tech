import { Router } from 'express';
import customersRouter from './customers.routes';

const routes = Router();

routes.use('/clientes', customersRouter);

export default routes;
