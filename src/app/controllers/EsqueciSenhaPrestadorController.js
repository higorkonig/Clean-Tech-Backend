import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import Prestador from '../models/Prestador';
import Senha from '../models/Senha';

import Mail from '../../lib/Mail';

class EsqueciSenhaPrestadorController {
	async index(req, res) {
		const { email } = req.body;

		const prestador = await Prestador.findOne({ where: { email } });

		if (!prestador) return res.status(400).json({ erro: 'E-mail incorreto' });

		const verificaHash = await Senha.findOne({
			where: {
				id_prestador: prestador.dataValues.id
			}
		});

		if (verificaHash && verificaHash.dataValues.expira > new Date()) {
			return res.status(400).json({
				erro: 'Ops, parece que você já solicitou um link de recuperação.'
			});
		} else {
			await Senha.destroy({
				where: {
					id_prestador: prestador.dataValues.id
				}
			});
		}

		const hash = crypto.randomBytes(16).toString('hex');
		let data = new Date();

		data = data.setDate(data.getDate() + 1);

		const grava = await Senha.create({
			id_prestador: prestador.dataValues.id,
			hash,
			expira: data
		});

		const link = `http://localhost:3000/${hash}/redefinir`;

		const responsavel = prestador.responsavel;
		const nome = prestador.nome;

		await Mail.sendMail({
			from: 'Equipe CleanTech<suporte@cleantech.ga>',
			to: `${prestador.responsavel} <${email}>`,
			subject: `Recuperação de senha`,
			template: 'redefinir',
			context: {
				responsavel,
				nome,
				link
			}
		});

		return res.status(200).json(grava.dataValues);
	}

	async update(req, res) {
		const { senha, id_prestador } = req.body;

		const prestador = await Prestador.findByPk(id_prestador);
		const senha_hash = await bcrypt.hash(senha, 8);

		await prestador.update({
			senha_hash
		});

		await Senha.destroy({
			where: {
				id_prestador: id_prestador
			}
		});

		return res.status(200).json({erro: "success"});
	}

	async verifica(req, res) {
		const { hash } = req.params;

		const senhaHash = await Senha.findOne({
			where: {
				hash: hash
			}
		});

		if (!senhaHash) return res.status(400).json({ message: 'Token invalido' });

		if (senhaHash.dataValues.expira < new Date()) {
			return res.json({ ok: false });
		} else {
			return res.json({ ok: true, id: senhaHash.dataValues.id_prestador });
		}
	}
}

export default new EsqueciSenhaPrestadorController();
