export interface ISendEmail {
    email: string;
    template: "email-verification" | "reset-password";
}