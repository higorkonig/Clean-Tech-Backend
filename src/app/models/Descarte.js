import Sequelize, { Model } from 'sequelize';

import Prestador from './Prestador';
import User from './User';

class Descarte extends Model {
	static init(sequelize) {
		super.init(
			{
				id_user: Sequelize.STRING,
				id_prestador: Sequelize.STRING,
				tipo: Sequelize.JSON,
				quatidade: Sequelize.STRING
			},
			{
				sequelize
			}
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'id_user' });
		this.belongsTo(models.Prestador, { foreignKey: 'id_prestador' });
	}
}

export default Descarte;
