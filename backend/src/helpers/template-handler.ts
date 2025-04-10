import * as path from "node:path"
import * as fs from "node:fs"
import hbs from "handlebars"
import { IMailerData } from "src/interfaces/mailer-data";

export const templateHandler = (data: Omit<IMailerData, "to">) => {
    const filePath = path.join(process.cwd(), "src", `templates/${data.templateName}.hbs`);
    const file = fs.readFileSync(filePath, "utf-8");
    const template = hbs.compile(file);
    return template({ username: data.username, token: data.token })
}