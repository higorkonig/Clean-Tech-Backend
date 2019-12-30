import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Prestador extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: Sequelize.STRING,
				responsavel: Sequelize.STRING,
				email: Sequelize.STRING,
				senha: Sequelize.VIRTUAL,
				senha_hash: Sequelize.STRING,
				telefone: Sequelize.STRING,
				cpf_cnpj: Sequelize.STRING,
				logradouro: Sequelize.STRING,
				numero: Sequelize.STRING,
				cep: Sequelize.STRING,
				bairro: Sequelize.STRING,
				cidade: Sequelize.STRING,
				estado: Sequelize.STRING,
				longitude: Sequelize.STRING,
        latitude: Sequelize.STRING,
				tipo: Sequelize.JSON,
			},
			{
				sequelize
			}
		);

		this.addHook('beforeSave', async prestador => {
			if (prestador.senha) {
				prestador.senha_hash = await bcrypt.hash(prestador.senha, 8);
			}
		});

		return this;
	}
}

export default Prestador;
