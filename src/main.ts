import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { corsSetUp } from './utils/cors';
import { AuthGuard } from './guards/auth.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsSetUp));
  app.use(cookieParser());
  app.useGlobalGuards(new AuthGuard());
  console.log('starting app on port : ', process.env.PORT);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
