import nodemailer from 'nodemailer';
import mailerConfig from "../config/mailer.config.js";
import logger from "../utils/logger.js";

export default class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: mailerConfig.host,
            port: mailerConfig.port,
            auth: {
                user: mailerConfig.auth.user,
                pass: mailerConfig.auth.pass,
            },
        });
    }
    sendMail(to, subject, text, html) {
        logger.info(`Sending mail to ${to}`);
        return this.transporter.sendMail({
            from: mailerConfig.from,
            to,
            subject,
            text,
            html,
        });
    }

    static sendMail(to, subject, text, html) {
        return new MailService().sendMail(to, subject, text, html);
    }
}