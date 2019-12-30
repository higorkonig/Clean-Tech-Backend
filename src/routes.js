import { Router } from 'express';

//Controllers
import PrestadorController from './app/controllers/PrestadorController';

const routes = Router();

routes.post('/prestador', PrestadorController.store);

export default routes;
