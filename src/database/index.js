import Sequelize from 'sequelize';

//Models


const models = [];


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