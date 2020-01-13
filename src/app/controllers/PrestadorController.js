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
			coleta,
			quantidade,
			totalColetado,
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
			coleta,
			quantidade,
			totalColetado,
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

		const prestador = await Prestador.findByPk(req.userId);

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

	async index(req, res) {
		const { id } = req.params;

		if (id == 'all') {
			const data = await Prestador.findAll({
				where: {
					coleta: 1
				},
				order: [['quantidade', 'DESC']]
			});
			return res.json({
				data
			});
		} else {
			const {
				nome,
				responsavel,
				email,
				tipo,
				quantidade,
				coleta,
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
			} = await Prestador.findOne({ where: { id } });
			return res.json({
				nome,
				responsavel,
				email,
				tipo,
				quantidade,
				telefone,
				coleta,
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

	async zerar(req, res) {
		const { id } = req.params;

    const prestador = await Prestador.findByPk(id);
    
		await prestador.update({
      quantidade: 0
    });

    const data = await Prestador.findAll({
      where: {
        coleta: 1
      },
      order: [['quantidade', 'DESC']]
    });


    req.io.emit(`atualizandoTabela${req.userId}`, data);

		return res.json({
			ok: true
		});
	}
}

export default new PrestadorController();
