import { PrismaService } from "./prisma.service";
import { Injectable } from "@nestjs/common";
import { HashService } from "./hash.service";
import { JwtService } from "./jwt.service";
import { MailerService } from "./mailer.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) { }
}