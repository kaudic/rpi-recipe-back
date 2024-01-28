import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, callback) => {
          const dest = process.env.RECIPE_IMAGE_DIRECTORY;
          callback(null, dest);
        },
        filename: (req, file, callback) => {
          const newFileName =
            file.originalname.split('.')[0].toLowerCase() +
            '.' +
            file.originalname.split('.')[1].toLowerCase();
          callback(null, newFileName);
        },
      }),
    }),
    RecipeModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
