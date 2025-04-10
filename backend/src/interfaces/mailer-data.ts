export interface IMailerData {
    token: string;
    to: string;
    templateName: "email-verification" | "forgotten-password";
    username: string;
}