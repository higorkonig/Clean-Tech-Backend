import * as Yup from 'yup';

//Model
import User from '../models/User';

class UserController {
	async store(req, res) {
		const userExiste = await User.findOne({
			where: { email: req.body.email }
		});

		if (userExiste) {
			return res.status(400).json({ erro: 'Esse e-mail já esta cadastrado!' });
		}

		const {
			id,
			nome,
			email,
			telefone,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			sexo,
			pontuacao
		} = await User.create(req.body);

		return res.status(200).json({
			id,
			nome,
			email,
			telefone,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			sexo,
			pontuacao
		});
	}

	async update(req, res) {
		const { senha_antiga } = req.body;

		const user = await User.findByPk(req.userId);

		if (senha_antiga && !(await user.checkSenha(senha_antiga))) {
			return res.status(400).json({ erro: 'A senhas não são iguais' });
		}

		const {
			id,
			nome,
			email,
			telefone,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			sexo
		} = await user.update(req.body);

		return res.json({
			id,
			nome,
			email,
			telefone,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			sexo
		});
	}
}

export default new UserController();
