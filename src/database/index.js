import Sequelize from 'sequelize';

//Models
import Prestador from '../app/models/Prestador';
import User from '../app/models/User';
import Descarte from '../app/models/Descarte';
import Senha from '../app/models/Senha';

const models = [Prestador, User, Descarte, Senha];

import databaseConfig from '../config/database';

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}
}

export default new Database();
