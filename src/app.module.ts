import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';
const environmentModule = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    environmentModule,
    // For Docker:
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'db-rpimrecipe',
        port: 5432,
        // host: 'localhost', // for local development
        // port: 5434, // for local development
        username: 'rpimrecipe',
        password: 'rpimrecipe',
        database: 'rpimrecipe',
        autoLoadEntities: true,
        entities: [],
        synchronize: true, // set to false in production
      }),
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
