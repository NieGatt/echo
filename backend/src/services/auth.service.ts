import { PrismaService } from "./prisma.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";
import { MailerService } from "./mailer.service";
import { User } from "@prisma/client"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) { }

    async register(data: Partial<User>) {
        const hasUser = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (hasUser) throw new ConflictException("Email already in use.");

        const passHash = this.hashService.hashData(data.password);
        const user = await this.prisma.user.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: passHash,
                isVerified: false,
                UserSession: { create: { type: "SYSTEM" } }
            }
        })

        const token = this.jwtService.createToken({
            sub: user.id,
            exp: 1000 * 60 * 30,
            intent: "email-verification",
            isVerified: user.isVerified
        })

        await this.mailerService.send({
            templateName: "email-verification",
            to: user.email,
            username: `${user.first_name} ${user.last_name}`,
            token
        })

        return user.email
    }
}