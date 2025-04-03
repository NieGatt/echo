import { PrismaService } from "./prisma.service";
import { Injectable } from "@nestjs/common";
import { RegisterUser } from "src/interfaces/register-user";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async register(data: RegisterUser) {
    }
}