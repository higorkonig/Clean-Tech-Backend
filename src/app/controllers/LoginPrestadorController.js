import jwt from 'jsonwebtoken';

//Config do jwt
import tokenConfig from '../../config/token';

//Model
import Prestador from '../models/Prestador';

class LoginPrestadorController {
	async store(req, res) {
		const { email, senha } = req.body;

		const prestador = await Prestador.findOne({ where: { email } });

		if (!prestador || !(await prestador.checkSenha(senha))) {
			return res.status(400).json({ erro: 'Senha ou e-mail incorreto' });
		}

		const { id, nome, responsavel } = prestador;

		return res.json({
			prestador: {
				id,
				nome,
				responsavel,
				email
			},
			tokenAcesso: jwt.sign({ id }, tokenConfig.secret, {
				expiresIn: tokenConfig.expiresIn
			})
		});
	}
}

export default new LoginPrestadorController();
