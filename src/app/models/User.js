import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
				senha: Sequelize.VIRTUAL,
				senha_hash: Sequelize.STRING,
				logradouro: Sequelize.STRING,
				numero: Sequelize.STRING,
				cep: Sequelize.STRING,
				bairro: Sequelize.STRING,
				cidade: Sequelize.STRING,
				estado: Sequelize.STRING,
				pontuacao: { type: Sequelize.STRING, defaultValue: 0 },
				sexo: Sequelize.STRING
			},
			{
				sequelize
			}
		);

		this.addHook('beforeSave', async user => {
			if (user.senha) {
				user.senha_hash = await bcrypt.hash(user.senha, 8);
			}
		});

		return this;
	}

	checkSenha(senha) {
		return bcrypt.compare(senha, this.senha_hash);
	}
}

export default User;
