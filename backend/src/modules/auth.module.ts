import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";
import { MailerService } from "src/services/mailer.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, MailerService]
})
export class AuthModule { }