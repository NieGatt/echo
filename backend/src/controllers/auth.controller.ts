import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "src/dto/register-dto";
import { AuthService } from "src/services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() dto: RegisterDto) {
        const email = await this.authService.register(dto);
        return `We sent an email to ${email}`
    }
}
