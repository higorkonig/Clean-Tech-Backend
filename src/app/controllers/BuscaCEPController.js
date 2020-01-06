import axios from 'axios';

class BuscaCEPController {
	async busca(req, res) {
		await axios
			.get(`https://cep.awesomeapi.com.br/json/${req.params.cep}`)
			.then(response => {
				const result = response.data;
				const data = {
					cep: result.cep,
					tipo_endereco: result.address_type,
					nome_endereco: result.address_name,
					logradouro: result.address,
					bairro: result.district,
					cidade: result.city,
					estado: result.state,
					latitude: result.lat,
					longitude: result.lng
				};
				return res.json(data);
			});
	}

	async buscaProximo(req, res) {
    const token = 'Token token=e4c2d1a783a910bf1ea97021989ef2f4'

		await axios
			.get(`http://www.cepaberto.com/api/v3/nearest?lat=${req.params.lag}&lng=${req.params.log}`, {
        headers: {
          Authorization: token
        }
      })
			.then(response => {
				const result = response.data;

				return res.json(result);
			});
	}
}

export default new BuscaCEPController();
