import Prestador from '../models/Prestador';
import User from '../models/User';
import Descarte from '../models/Descarte';
class DescarteController {
	async store(req, res) {
		const data = req.body;
		const { id_user, id_prestador, tipo, quantidade } = await Descarte.create(
			{
				id_user: data.id_user,
				id_prestador: data.id_prestador,
				tipo: data.tipo,
				quantidade: data.quantidade
			},
			{ attributes: ['id_user', 'id_prestador', 'tipo', 'quantidade'] }
    );
    
    const totalPontos = Number(quantidade) + Number(req.body.pontos);

    const user = await User.findByPk(req.userId);

		const { pontuacao } = await user.update({
			pontuacao: Number(user.dataValues.pontuacao) + Number(totalPontos)
		});

		return res.json({
			descarte: {
				id_user,
				id_prestador,
				tipo,
				quantidade
			},
			user: {
				pontuacao
			}
		});
	}

	async index(req, res) {
		const { tipo } = req.query;

		let descarte = await Prestador.findAll({
			attributes: [
				'id',
				'nome',
				'responsavel',
				'email',
				'tipo',
				'telefone',
				'cpf_cnpj',
				'logradouro',
				'numero',
				'cep',
				'bairro',
				'cidade',
				'estado',
				'longitude',
				'latitude'
			]
		});
		let descarteJson = JSON.stringify(descarte);
		descarteJson = JSON.parse(descarteJson);
		const result = [];

		for (let i = 0; i < descarteJson.length; i++) {
			const certo = JSON.parse(descarteJson[i].tipo);
			certo.map(descartes => {
				if (descartes === tipo) {
					result.push(descarteJson[i]);
				}
			});
		}

		return res.json(result);
	}
}

export default new DescarteController();
