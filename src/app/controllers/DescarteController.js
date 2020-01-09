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

		const pontos = Number(quantidade) * Number(req.body.pontos);

		const user = await User.findByPk(req.userId);

		let userNivel = user.dataValues.nivel;

		const totalPontos = Number(pontos) + Number(user.dataValues.pontuacao);

		const niveis = Number(totalPontos) / 100 / 10 + 1;

		let proximonNivel;
		if (niveis <= userNivel) {
			proximonNivel = 500 * Math.round(Number(userNivel));
		} else {
			proximonNivel = 500 * Math.round(Number(niveis));
		}

		if (totalPontos >= proximonNivel) {
			if (niveis <= userNivel) {
				userNivel = Number(userNivel) + 1;
			} else {
				userNivel = Number(userNivel) + Math.ceil(Number(niveis));
			}
		}

		const { pontuacao, nivel } = await user.update({
			pontuacao: totalPontos,
			nivel: userNivel
    });
    
    const donoSocket = req.userConectados.id_prestador;
    
    console.log(donoSocket);

    if(donoSocket) {
      req.io.to(donoSocket).emit('quantidade', pontos)
    }

		return res.json({
			descarte: {
				id_user,
				id_prestador,
				tipo,
				quantidade
			},
			user: {
				pontuacao,
				nivel
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

	async descarte(req, res) {
		const { id } = req.params;

		let descarte = await Descarte.findAll({
			where: {
				id_prestador: id
			},
			include: [
				{ model: User, as: 'user' },
				{ model: Prestador, as: 'prestador' }
			]
    });
    

		return res.json(descarte);
	}
}

export default new DescarteController();
