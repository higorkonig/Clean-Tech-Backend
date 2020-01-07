import jwt from 'jsonwebtoken';

//Config do jwt
import tokenConfig from '../../config/token';

//Model
import User from '../models/User';

class LoginUserController {
	async store(req, res) {
		const { email, senha } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user || !(await user.checkSenha(senha))) {
			return res.status(400).json({ erro: 'Senha ou e-mail incorreto' });
		}

		const { id, nome, responsavel } = user;

		return res.json({
			user: {
				id,
				nome,
				email
			},
			tokenAcesso: jwt.sign({ id }, tokenConfig.secret, {
				expiresIn: tokenConfig.expiresIn
			})
		});
	}
}

export default new LoginUserController();
