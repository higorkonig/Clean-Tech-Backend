import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import hbs from 'nodemailer-express-handlebars';

import { resolve } from 'path';

class Mail {
	constructor() {
		this.transport = nodemailer.createTransport({
			host: 'smtp.umbler.com',
			port: 587,
			auth: {
				user: 'suporte@cleantech.ga',
				pass: 'tKE(94{vtR}7'
			}
    });
    
    this.configTemplate();
  }
  
  configTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'mails');

    this.transport.use('compile', hbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir:  resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs'
    }))
  }

	sendMail(message) {
		return this.transport.sendMail({
			...message
		});
	}
}

export default new Mail();

// const transport = nodemailer.createTransport({
// 	host: 'smtp.umbler.com',
// 	port: 587,
// 	auth: {
// 		user: 'suporte@cleantech.ga',
// 		pass: 'tKE(94{vtR}7'
// 	}
// });

// transport.use(
// 	'compile',
// 	hbs({
// 		viewEngine: 'handlebars',
// 		layoutsDir:  resolve(__dirname, '..', 'mail'),
// 		partialsDir:  resolve(__dirname, '..', 'mail'),
// 		viewPath: resolve(__dirname, '..', 'mail'),
// 		extName: '.html'
// 	})
// );

// export default transport;
