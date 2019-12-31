import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';


const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '8157dbc6faba3e',
		pass: 'f7816d1f875667'
	}
});


transport.user('compile', hbs({
  viewEngine: 'handlebars', 
  viewPath: resolve('./src/mail/'),
  extName: '.html',
}))


export default transport;