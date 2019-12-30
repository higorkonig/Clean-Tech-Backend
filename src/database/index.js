import Sequelize from 'sequelize';

//Models
import Prestador from '../app/models/Prestador'

const models = [Prestador];


import databaseConfig from '../config/database';


class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
