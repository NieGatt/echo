import { PrismaService } from "./prisma.service";
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";
import { MailerService } from "./mailer.service";
import { User } from "@prisma/client"
import { ISendEmail } from "src/interfaces/send-email";

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
            exp: 1000 * 60 * 60 * 24 * 3,
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

    async login(data: Pick<User, "email" | "password">) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
            include: { UserSession: true }
        })

        if (!user) throw new NotFoundException("Email not registered.");

        if (!user.isVerified) throw new UnauthorizedException("Email not verified.");

        if (!user.password) {
            const msg = `Email signed up with ${user.UserSession.type.toLowerCase()}`;
            throw new BadRequestException(msg);
        }

        const isEqual = this.hashService.compareData(data.password, user.password);

        if (!isEqual) throw new BadRequestException("Incorrect email or password.");

        const refreshToken = this.jwtService.createRefresh(user.id);
        const hashedRt = this.hashService.hashData(refreshToken);

        await this.prisma.session.update({
            where: { userId: user.id },
            data: { refreshToken: hashedRt }
        })

        const accessToken = this.jwtService.createToken({
            exp: 1000 * 60 * 30,
            sub: user.id,
            isVerified: user.isVerified,
            intent: "system-access"
        })

        return accessToken
    }

    async logout(userId: string) {
        await this.prisma.session.update({
            where: { userId },
            data: {
                refreshToken: null,
                lastLogout: new Date()
            }
        })
    }

    async verify(email: string) {
        await this.prisma.user.update({
            where: { email },
            data: { isVerified: true }
        })
    }

    async sendEmail(data: ISendEmail) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) throw new BadRequestException("Email not registered.");

        let exp: number = 1000 * 60 * 10;
        let intentAndTemplate: "email-verification" | "reset-password" = "reset-password";

        if (data.template === "email-verification") {
            if (user.isVerified) throw new BadRequestException("Email already verified.");

            exp = 1000 * 60 * 60 * 24 * 3;
            intentAndTemplate = "email-verification"
        }

        if (!user.isVerified) throw new BadRequestException("Email not verified.");

        const token = this.jwtService.createToken({
            sub: user.id,
            exp,
            intent: intentAndTemplate,
            isVerified: user.isVerified
        })

        await this.mailerService.send({
            templateName: intentAndTemplate,
            to: user.email,
            username: `${user.first_name} ${user.last_name}`,
            token
        })
    }

    async forgotPassword(id: string, newPassword: string) {
        const hash = this.hashService.hashData(newPassword);
        await this.prisma.user.update({
            where: { id },
            data: { password: hash }
        })
    }
}