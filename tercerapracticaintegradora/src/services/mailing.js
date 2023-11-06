import nodemailer from 'nodemailer';
import config from '../config/config.js';

// Configura el transporte de nodemailer para enviar correos
export default class MailingService {
    cosntructor() {
        this.client = mailer.createTransport({
            service: config.mailing.SERVICE, // O utiliza otros servicios de correo
            port: 587,
            auth: {
                 user: config.mailing.USER,
                 pass: config.mailing.PASSWORD,
            },
        });
    }
    sendSimpleMail = async ({
        from,
        to,
        subject,
        text,
        html,
        attachements = [],
      }) => {
        let result = await this.client.sendMail({
          from,
          to,
          subject,
          text,
          html,
          attachements,
        });
    
        return result;
      };
}