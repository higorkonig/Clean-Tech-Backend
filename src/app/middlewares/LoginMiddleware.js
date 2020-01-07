import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import tokenConfig from '../../config/token';

export default async (req, res, next) => {
	const tokenHeader = req.headers.authorization;

	if (!tokenHeader) {
		res.status(401).json({ erro: 'Token não fornecido' });
	}

	const [, token] = tokenHeader.split(' ');

	try {
		const decoder = await promisify(jwt.verify)(token, tokenConfig.secret);

		req.userId = decoder.id;

		return next();
	} catch (err) {
		return res
			.status(401)
			.json({ erro: 'Token fornecido é inválido ou já expirou' });
	}
};
