import express from 'express';
import routes from './routes';

// const app = express();
// const port = 3000

// app.listen(port, () => {
//   console.log('Server ligado rodando na porta ' + port);
// });
// app.use(express.json());

// app.use(routes);

import './database';

class Server {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}
}

export default new Server().server;
