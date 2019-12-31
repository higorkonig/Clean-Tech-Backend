import Prestador from '../models/Prestador';
import crypto from 'crypto';

class EsqueciSenhaPrestadorController {
	async store(req, res) {
		const { email } = req.body;

		try {
		const prestador = await Prestador.findOne({ where: { email } });

		if (!prestador) return res.status(400).json({ erro: 'Usuário não existe' });

		const token = crypto.randomBytes(20).toString('hex');
		const agora = new Date();
		agora.setHours(agora.getHours() + 1);

		await Prestador.update(
			{
				tokenResetSenha: token,
				tokenResetSenhaExpira: agora
			},
			{ where: { id: prestador.id } }
		);

		console.log(token, agora, prestador.responsavel);

		} catch (err) {
		  res.status(400).send({ erro: 'Falha na recuperação de senha!', err });
		  console.log(token, agora, prestador.id)
		}
	}
}

export default new EsqueciSenhaPrestadorController();
