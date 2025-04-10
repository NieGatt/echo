import { PickType } from "@nestjs/mapped-types";
import { RegisterDto } from "./register-dto";
import { IsEnum } from "class-validator";

enum Templates {
    "email-verification" = "email-verification",
    "reset-password" = "reset-password"
}

export class SendEmailDto extends PickType(RegisterDto, ["email"] as const) {
    @IsEnum(Templates)
    template: Templates
}