import axios from 'axios';

class BuscaCEPController {
	async busca(req, res) {
		await axios
			.get(`https://cep.awesomeapi.com.br/json/${req.params.cep}`, {
				validateStatus: status => {
					return status >= 200 && status < 500;
				}
			})
			.then(response => {
				console.log(response.status);
				if (response.status == 200) {
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
				} else if (response.status == 400) {
					const result = response.data;
					const data = {
						cep: result.msg,
						tipo_endereco: result.msg,
						nome_endereco: result.msg,
						logradouro: result.msg,
						bairro: result.msg,
						cidade: result.msg,
						estado: result.msg,
						latitude: result.msg,
						longitude: result.msg
					};
					return res.json(data);
				}
			});
	}
}

export default new BuscaCEPController();
