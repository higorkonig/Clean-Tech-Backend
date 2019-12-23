import { Router } from 'express';


const routes = Router();

routes.get('/', (req, res) => {
  return res.json({mensagem: 'Olá mundo!!! Estou no node'})
});


export default routes;