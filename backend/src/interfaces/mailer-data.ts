export interface IMailerData {
    token: string;
    to: string;
    templateName: "email-verification" | "reset-password";
    username: string;
}