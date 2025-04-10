import { PickType } from "@nestjs/mapped-types";
import { RegisterDto } from "./register-dto";

export class VerifyEmailDto extends PickType(RegisterDto, ["email"] as const) { }