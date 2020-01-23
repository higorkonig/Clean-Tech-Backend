import crypto from 'crypto';
import bcrypt from 'bcryptjs';


import Prestador from '../models/Prestador';
import Senha from '../models/Senha';

import mailer from '../../config/mailer';

class EsqueciSenhaPrestadorController {
    async index(req, res) {
        const {email} = req.body;

        const prestador = await Prestador.findOne({where: {email}});

        if (!prestador) return res.status(400).json({erro: 'Usuário não existe T.T'});

        const verificaHash = await Senha.findOne({
            where: {
                id_prestador: prestador.dataValues.id,
            }
        });

        if (verificaHash && verificaHash.dataValues.expira > new Date()) {
            return res.status(400).json({erro: 'Token ainda válido'});
        } else {
            await Senha.destroy({
                where: {
                    id_prestador: prestador.dataValues.id,
                }
            })
        }

        const hash = crypto.randomBytes(16).toString('hex');
        let data = new Date();

        data = data.setDate(data.getDate() + 1);

        const grava = await Senha.create({
            id_prestador: prestador.dataValues.id,
            hash,
            expira: data,
        });

        const link = `http://localhost:3000/${hash}/redefinir`;

        mailer.sendMail(
            {
                from: 'Recuperação de senha <suporte@cleantech.ga>',
                to: `${prestador.responsavel} <${email}>`,
                subject: `Recuperação de senha`,
                html: `<p>Olá ${prestador.responsavel} da empresa ${prestador.nome}, aqui está o link para redefinir sua senha:</p>
        			<p>link: <strong>${link}</strong></p>`
            },
            err => {
                if (err) res.status(400).send({erro: 'Falha ao enviar o email'});

                return res.send();
            }
        );

        return res.status(200).json(grava.dataValues);

    }

    async update(req, res) {
        const {senha, id_prestador} = req.body;

        const prestador = await Prestador.findByPk(id_prestador);
        const senha_hash = await bcrypt.hash(senha, 8);

        const foi = await prestador.update({
            senha_hash
        });
        return res.json(foi)
    }
}

export default new EsqueciSenhaPrestadorController();
