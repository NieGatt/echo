import { PickType } from "@nestjs/mapped-types";
import { RegisterDto } from "./register-dto";

export class forgotPasswordDto extends PickType(RegisterDto, ["password"] as const) { }