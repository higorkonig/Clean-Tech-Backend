//Model
import Prestador from '../models/Prestador';

class PrestadorController {
	async store(req, res) {
		const prestadorExiste = await Prestador.findOne({
			where: { email: req.body.email }
		});

		if (prestadorExiste) {
			return res.status(400).json({ erro: 'Esse e-mail já esta cadastrado!' });
		}

		const {
			id,
			nome,
			responsavel,
			email,
			tipo,
			telefone,
			cpf_cnpj,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			longitude,
			latitude
		} = await Prestador.create(req.body);

		return res.status(200).json({
			id,
			nome,
			responsavel,
			email,
			tipo,
			telefone,
			cpf_cnpj,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			longitude,
			latitude
		});
	}

	async update(req, res) {
		const { senha_antiga } = req.body;

		const prestador = await Prestador.findByPk(req.prestadorId);

		if (senha_antiga && !(await prestador.checkSenha(senha_antiga))) {
			return res.status(400).json({ erro: 'A senhas não são iguais' });
		}

		const {
			id,
			nome,
			responsavel,
			email,
			tipo,
			telefone,
			cpf_cnpj,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			longitude,
			latitude
		} = await prestador.update(req.body);

		return res.json({
			id,
			nome,
			responsavel,
			email,
			tipo,
			telefone,
			cpf_cnpj,
			logradouro,
			numero,
			cep,
			bairro,
			cidade,
			estado,
			longitude,
			latitude
		});
	}
}

export default new PrestadorController();
