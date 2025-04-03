import { Module } from "@nestjs/common";
import { HelperModule } from "./helper.module";
import { AuthModule } from "./auth.module";

@Module({
    imports: [HelperModule, AuthModule]
})
export class AppModule { }