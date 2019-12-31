import { Router } from 'express';

//Controllers
import PrestadorController from './app/controllers/PrestadorController';
import LoginPrestadorController from './app/controllers/LoginPrestadorController';
import EsqueciSenhaPrestadorController from './app/controllers/EsqueciSenhaPrestadorController';

//Middlewares
import LoginPrestadorMiddleware from './app/middlewares/LoginPrestadorMiddleware';

const routes = Router();

//Routes Web
routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);
routes.put('/esqueci_senha', EsqueciSenhaPrestadorController.store);
//
//Routes App

//
routes.use(LoginPrestadorMiddleware);

export default routes;
