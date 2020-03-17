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

routes.get('/download', function(req, res){
    const file = `${__dirname}/public/EKKOs.apk`;
    res.download(file); // Set disposition and send it.
  });

//Routes Web sem Autenticação
routes.post('/prestador', PrestadorController.store);
routes.post('/login', LoginPrestadorController.store);
routes.get('/cep/:cep', BuscaCEPController.busca);
routes.put('/esqueci_senha', EsqueciSenhaPrestadorController.index);
routes.put('/redefinir_senha', EsqueciSenhaPrestadorController.update);
routes.get('/:hash', EsqueciSenhaPrestadorController.verifica);
routes.get('/list/lugar', DescarteController.todos);
routes.get('/descarte', DescarteController.index);
routes.get('/prestador/all', DescarteController.todosWeb);
routes.post('/descarte', DescarteController.store);
routes.get('/descarte/:id', DescarteController.descarte);

//
//Routes App sem Autenticação
routes.post('/user', UserController.store);
routes.post('/login_user', LoginUserController.store);
routes.put('/esqueci_senha_user', EsqueciSenhaUserController.store);
routes.put('/user', UserController.update);
routes.post('/descarte/:userId', DescarteController.store);
//

//Middleware
routes.use(LoginMiddleware);

//Routes Web com Autenticação
routes.put('/prestador', PrestadorController.update);
routes.get('/prestador/:id', PrestadorController.index);
routes.get('/prestador/:id/zerar', PrestadorController.zerar);
//

export default routes;
