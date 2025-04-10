export interface ITokenData {
    sub: string;
    exp: number;
    isVerified: boolean;
    intent: "email-verification" | "reset-password" | "system-access";
}