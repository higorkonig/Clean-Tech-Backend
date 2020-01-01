import { Router } from 'express';

//Controllers
import PrestadorController from './app/controllers/PrestadorController';
import LoginPrestadorController from './app/controllers/LoginPrestadorController';
import EsqueciSenhaPrestadorController from './app/controllers/EsqueciSenhaPrestadorController';

//Middlewares
import LoginPrestadorMiddleware from './app/middlewares/LoginPrestadorMiddleware';
import Prestador from './app/models/Prestador';

const routes = Router();

//Routes Web sem Autenticação
routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);
routes.put('/esqueci_senha', EsqueciSenhaPrestadorController.store);
//
//Routes App sem Autenticação

//

routes.use(LoginPrestadorMiddleware);

//Routes Web com Autenticação
routes.put('/prestador', PrestadorController.update);

export default routes;
