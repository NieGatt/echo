import * as mailer from "nodemailer"
import { Injectable } from "@nestjs/common"
import "dotenv/config"
import { templateHandler } from "src/helpers/template-handler";

@Injectable()
export class MailerService {
    private create() {
        return mailer.createTransport({
            host: process.env.SMTP_HOST,
            secure: false,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as unknown)
    }

    async send(data: any) {
        const transporter = this.create();
        const template = templateHandler({
            username: data.username,
            token: data.token,
            template: data.template
        })

        await transporter.sendMail({
            from: "itbreaksfast@gmail.com",
            to: data.email,
            html: template
        })
    }
}