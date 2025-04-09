import { Controller, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }
}
