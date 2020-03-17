import express from 'express';
import routes from './routes';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';

import './database';

class Server {
	constructor() {
		this.app = express();
		this.server = http.Server(this.app);
	    this.io = socketio(this.server);
	    this.io.on('connection', socket => {

		});
		this.middlewares();
		this.routes();
	}
	middlewares() {
		this.app.use((req, res, next) => {
			req.io = this.io;

			return next();
		});
		this.app.use(cors());
    	this.app.use(express.json());
    	this.app.use('/public', express.static(__dirname + '/public'));
	}

	routes() {
		this.app.use(routes);
	}
}

export default new Server().server;
