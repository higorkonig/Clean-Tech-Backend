import { Router } from 'express';

//Controllers Prestador
import PrestadorController from './app/controllers/PrestadorController';
import LoginPrestadorController from './app/controllers/LoginPrestadorController';
import EsqueciSenhaPrestadorController from './app/controllers/EsqueciSenhaPrestadorController';
import BuscaCEPController from './app/controllers/BuscaCEPController';
import DescarteController from './app/controllers/DescarteController';

//Controllers User
import UserController from './app/controllers/UserController';
import LoginUserController from './app/controllers/LoginUserController';
import EsqueciSenhaUserController from './app/controllers/EsqueciSenhaUserController';

//Middlewares
import LoginMiddleware from './app/middlewares/LoginMiddleware';

const routes = Router();



//Routes Web sem Autenticação
routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);
routes.get('/cep/:cep', BuscaCEPController.busca);
routes.put('/esqueci_senha', EsqueciSenhaPrestadorController.index);
routes.put('/redefinir_senha', EsqueciSenhaPrestadorController.update);
routes.get('/descarte', DescarteController.index);
routes.get('/descarte/:id', DescarteController.descarte);
routes.get('/descartes', DescarteController.todos);

//
//Routes App sem Autenticação
routes.post('/user', UserController.store);
routes.post('/login_user', LoginUserController.store);
routes.put('/esqueci_senha_user', EsqueciSenhaUserController.store);

//
//Middleware
routes.use(LoginMiddleware);
//
//Routes Web com Autenticação
routes.put('/prestador', PrestadorController.update);
routes.get('/prestador/:id', PrestadorController.index);
routes.get('/prestador/:id/zerar', PrestadorController.zerar);
//

//Routes App com Autenticação
routes.put('/user', UserController.update);
routes.post('/descarte', DescarteController.store);
//

export default routes;
