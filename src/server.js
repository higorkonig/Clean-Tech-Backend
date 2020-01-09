import express from 'express';
import routes from './routes';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';

import './database';

const userConectados = {};

class Server {
	constructor() {
		this.app = express();
		this.server = http.Server(this.app);
		this.io = socketio(this.server);
		this.middlewares();
		this.routes();

		this.io.on('connection', socket => {
			this.userId = socket.handshake.query;
			userConectados[this.userId] = socket.id;
		});
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use((req, res, next) => {
			req.io = this.io;

			req.userConectados = this.userConectados;

			return next();
		});
	}

	routes() {
		this.app.use(routes);
	}
}

export default new Server().server;
