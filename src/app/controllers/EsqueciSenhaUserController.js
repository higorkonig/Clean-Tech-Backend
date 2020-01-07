import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import mailer from '../../config/mailer';

import User from '../models/User';

class EsqueciSenhaUserController {
	async store(req, res) {
		const { email } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) return res.status(400).json({ erro: 'Usuário não existe T.T' });

		const novaSenha = crypto.randomBytes(6).toString('hex');

		const novaSenhaHash = await bcrypt.hash(novaSenha, 8);

		await user.update(
			{
				senha_hash: novaSenhaHash
			},
			{ where: { id: user.id } }
		);

		console.log(`Nova senha gerada pelo sistema: ${novaSenha}`);

		mailer.sendMail(
			{
				from: 'Recuperação de senha <higor@shump.xyz>',
				to: `${user.nome} <${email}>`,
				subject: `Recuperação de senha`,
				html: `<p>Olá ${user.nome}, aqui está a sua nova senha, lembre-se de quando acessar troca-la</p>
        <p>Senha: <strong>${novaSenha}</strong></p>`
			},
			err => {
				if (err) res.status(400).send({ erro: 'Falha ao enviar o email' });

				return res.send();
			}
		);
	}
}

export default new EsqueciSenhaUserController();
