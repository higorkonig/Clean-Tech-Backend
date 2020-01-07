import Prestador from '../models/Prestador';

class ListarController {
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

export default new ListarController();
