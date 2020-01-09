import Prestador from '../models/Prestador';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import mailer from '../../config/mailer';

class EsqueciSenhaPrestadorController {
	async store(req, res) {
		const { email } = req.body;

		const prestador = await Prestador.findOne({ where: { email } });

		if (!prestador) return res.status(400).json({ erro: 'Usuário não existe T.T' });

		const novaSenha = crypto.randomBytes(6).toString('hex');

    const novaSenhaHash = await bcrypt.hash(novaSenha, 8);

		await prestador.update(
			{
        senha_hash: novaSenhaHash
			},
			{ where: { id: prestador.id } }
		);

    
		mailer.sendMail(
			{
				from: 'Recuperação de senha <Suporte CleanTech>',
				to: `${prestador.responsavel} <${email}>`,
				subject: `Recuperação de senha`,
				html: `<p>Olá ${prestador.responsavel} da empresa ${prestador.nome}, aqui está a sua nova senha, lembre-se de quando acessar troca-la</p>
        <p>Senha: <strong>${novaSenha}</strong></p>`
			},
			err => {
				if (err) res.status(400).send({ erro: 'Falha ao enviar o email' });

				return res.send();
			}
    );
    
	}
}

export default new EsqueciSenhaPrestadorController();
