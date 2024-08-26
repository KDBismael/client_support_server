import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface SucessEmailI {
    message: string;
}

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Configure the transporter with your email provider's settings
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io', // Your SMTP server host
            port: 587, // SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'eff88697a5a733',
                pass: 'b4165bc24f5482',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string): Promise<SucessEmailI> {
        const mailOptions = {
            from: 'De PayQin Bot <payqin-bot@payqin.com>',
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            return { message: "Email sent sucessfully" }
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Could not send email');
        }
    }
}
