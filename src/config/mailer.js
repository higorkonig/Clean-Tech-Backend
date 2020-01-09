import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

const transport = nodemailer.createTransport({
  host: "smtp.umbler.com",
  port: 587,
  auth: {
    user: "suporte@cleantech.ga",
    pass: "konig33244891"
  }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars', 
  viewPath: resolve('./src/mail/'),
  extName: '.html',
}));


export default transport;