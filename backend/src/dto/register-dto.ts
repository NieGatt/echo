import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @Length(1, 40)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'\s-]+$/)
    first_name: string;

    @IsString()
    @Length(1, 40)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'\s-]+$/)
    last_name: string;

    @IsEmail()
    @Length(1, 40)
    email: string;

    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d()=+\-*&%$#@!<>?:;.,]).*$/, {
        message:
            'password must contain at least one uppercase letter, one lowercase letter, and one number or symbol (()=+-*&%$#@!<>?:;.,)',
    })
    password: string;
}
