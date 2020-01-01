import axios from 'axios';


class BuscaCEPController {
  async store(req, res) {
    await axios.get(`https://cep.awesomeapi.com.br/json/${req.params.cep}`).then( (response) => {
      const result = response.data;
      const data = {
        cep: result.cep,
        tipo_endereco: result.address_type,
        nome_endereco: result.address_name,
        endereco: result.address,
        bairro: result.district,
        cidade: result.city,
        estado: result.state,
        latitude: result.lat,
        longitude: result.lng
      }
      return res.json(data);

    })

  }
}

export default new BuscaCEPController;