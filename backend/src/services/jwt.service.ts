import { JsonWebTokenError, sign, verify } from "jsonwebtoken"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import "dotenv/config"
import { ITokenData } from "src/interfaces/token-data";

@Injectable()
export class JwtService {
    private secret = process.env.TOKEN_SECRET;
    private refresh_secret = process.env.REFRESH_TOKEN_TOKEN;

    createToken(data: ITokenData): string {
        return sign({
            isVerified: data.isVerified,
            intent: data.intent
        }, this.secret, {
            expiresIn: data.exp,
            subject: data.sub
        })
    }

    validateToken(token: string) {
        this.validate(token, this.secret)
    }

    createRefresh(id: string) {
        return sign({ sub: id }, this.refresh_secret, {
            expiresIn: "7d"
        })
    }

    validateRefresh(token: string) {
        this.validate(token, this.refresh_secret)
    }

    private validate(token: string, secret: string) {
        try {
            return verify(token, secret)
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                switch (err.name) {
                    case "TokenExpiredError":
                        throw new UnauthorizedException("Expired access token");
                    case "JsonWebTokenError":
                        throw new UnauthorizedException("Not valid access token");
                }
            }
        }
    }
}