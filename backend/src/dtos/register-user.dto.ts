import { IsEmail, IsString, Length, Matches } from "class-validator"

export class RegisterUserDto {
    @IsString()
    @Matches(/^[a-záàâãéèêíïóôõöúçñ\s]{8,12}$/i)
    username: string;

    @IsString()
    @IsEmail()
    @Length(5, 40)
    email: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[0-9!@#$%^&*_:\)\(-])[a-zA-Z0-9!@#$%^&*_:\)\(-]{8,12}$/)
    password: string;
}