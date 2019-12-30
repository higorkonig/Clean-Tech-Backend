import { Router } from 'express';

//Controllers
import PrestadorController from './app/controllers/PrestadorController';
import LoginPrestadorController from './app/controllers/LoginPrestadorController';

const routes = Router();

routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);

export default routes;
