import * as path from "node:path"
import * as fs from "node:fs"
import hbs from "handlebars"

export const templateHandler = (data: any) => {
    const filePath = path.join(process.cwd(), "src", "templates", `${data.template}`);
    const file = fs.readFileSync(filePath, "utf-8");
    const template = hbs.compile(file);
    return template({ username: data.username, token: data.token })
}