import express from 'express';
import routes from './routes';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';

import './database';

const PORT = 3003;

const app = express();

const server = http.Server(app);

const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
})



