import { Body, Controller, Post, Put, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { forgotPasswordDto } from "src/dto/forgot-password-dto";
import { LoginDto } from "src/dto/login-dto";
import { RegisterDto } from "src/dto/register-dto";
import { SendEmailDto } from "src/dto/send-email-dto";
import { VerifyEmailDto } from "src/dto/veriy-email-dto";
import { AuthService } from "src/services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() dto: RegisterDto) {
        const email = await this.authService.register(dto);
        return `We sent an email to ${email}`
    }

    @Post("login")
    async login(@Res() res: Response, @Body() dto: LoginDto) {
        const accessToken = await this.authService.login(dto);
        return res.cookie("accessToken", accessToken, {
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: false
        })
    }

    @Post("logout")
    async logout(@Req() req: any, @Res() res: Response) {
        const userId = req.user.id
        await this.authService.logout(userId);
        res.clearCookie("accessToken")
    }

    @Post("verify-email")
    async verifyEmail(@Body() dto: VerifyEmailDto) {
        await this.authService.verify(dto.email)
    }

    @Post("email-sending")
    async sendEmail(@Body() dto: SendEmailDto) {
        await this.authService.sendEmail(dto);
        return `We sent an email to ${dto.email}`
    }

    @Put("forgot-password")
    async forgotPassword(@Req() req: any, @Body() dto: forgotPasswordDto) {
        const userId = req.userId.id
        await this.authService.forgotPassword(userId, dto.password);
    }
}
