import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { } from "class-transformer"
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
    const validationConfig: ValidationPipeOptions = {
        transform: true,
        whitelist: true,
        enableDebugMessages: true,
        stopAtFirstError: true
    }

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe(validationConfig))
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();