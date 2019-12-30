import { Router } from 'express';

//Controllers
import PrestadorController from './app/controllers/PrestadorController';
import LoginPrestadorController from './app/controllers/LoginPrestadorController';


//Middlewares
import LoginPrestadorMiddleware from './app/middlewares/LoginPrestadorMiddleware';
const routes = Router();

routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);

routes.use(LoginPrestadorMiddleware);

export default routes;
