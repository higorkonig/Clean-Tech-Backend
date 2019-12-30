import bcrypt from 'bcryptjs';

import sql from '../models/Connection';

class UserController {
	store(req, res) {
		const {
			nome,
			dataNascimento,
			tipoPessoa,
			cpf,
			email,
			sexo,
			escolaridade
		} = req.body;
		const data = new Date();
		const dataAgora = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;

		sql.query(
			'SELECT * FROM `TB_Clientes` WHERE `Email` = ?',
			[email],
			function (error, results, fields) {
				// numRows = results.length;
        console.log(results);
				if (true) {
					let senhaNova = req.body.senha;
				const salt = bcrypt.genSaltSync(8);
				const hash = bcrypt.hashSync(senhaNova, salt);

					sql.query(
						'INSERT INTO TB_Clientes(Nome, DataNascimento, TipoPessoa, CPF_CNPJ, Email, Senha, Sexo, Escolaridade, DataCadastro) VALUES (?,?,?,?,?,?,?,?,?)',
						[
							nome,
							dataNascimento,
							tipoPessoa,
							cpf,
							email,
							senhaNova,
							sexo,
							escolaridade,
							dataAgora
						],
						(error, results) => {
							if (error) {
								return res.json({message: error});
							} else {
								return res.json({
									nome,
									dataNascimento,
									tipoPessoa,
									cpf,
									email,
									sexo,
									escolaridade,
                  dataAgora,
                  message: 'Criado com sucesso!'
								});
							}
						}
					);
				}else {
          return res.json({
            nome,
            dataNascimento,
            tipoPessoa,
            cpf,
            email,
            sexo,
            escolaridade,
            dataAgora,
            message: 'Usuários já existe!'
          });
        }
			}
		);
	}
}

export default new UserController();
