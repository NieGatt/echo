import { compareSync, hashSync } from "bcrypt"
import { Injectable } from "@nestjs/common"

@Injectable()
export class HashService {
    salt = 10
    hashData(data: string): string {
        return hashSync(data, this.salt)
    }

    compareData(data: string, hashedDAta: string): boolean {
        return compareSync(data, hashedDAta);
    }
}