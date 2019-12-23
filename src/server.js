import express from 'express';
import routes from './routes';


const app = express();


app.listen(3000, () => {
  console.log('Server ligado')
});
app.use(express.json());
app.use(routes);