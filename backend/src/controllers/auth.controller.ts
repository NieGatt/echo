import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/dtos/register-user.dto";
import { AuthService } from "src/services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() dto: RegisterUserDto) {
        const newUserEmail = await this.authService.register(dto);
        return `We've sent a verification to ${newUserEmail}`
    }
}
