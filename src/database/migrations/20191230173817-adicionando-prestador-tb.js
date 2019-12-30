'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('prestadores', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},
			resposavel: {
				type: Sequelize.STRING,
				allowNull: false
      },
      email: {
				type: Sequelize.STRING,
				allowNull: false
      },
			senha_hash: {
				type: Sequelize.STRING,
				allowNull: false
      },
      tipo: {
				type: Sequelize.TEXT,
				allowNull: false
      },
      telefone: {
				type: Sequelize.STRING,
				allowNull: false
      },
      cpf_cnpj: {
				type: Sequelize.STRING,
				allowNull: false
      },
      logradouro: {
				type: Sequelize.STRING,
				allowNull: false
      },
      numero: {
				type: Sequelize.STRING,
				allowNull: false
      },
      cep: {
				type: Sequelize.STRING,
				allowNull: false
      },
      bairro: {
				type: Sequelize.STRING,
				allowNull: false
      },
      cidade: {
				type: Sequelize.STRING,
				allowNull: false
      },
      estado: {
				type: Sequelize.STRING,
				allowNull: false
      },
      logradouro: {
				type: Sequelize.STRING,
				allowNull: true
      },
      longitude: {
				type: Sequelize.STRING,
				allowNull: true
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('prestadores');
	}
};
