import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Inject,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/upload')
export class UploadController {
  constructor(
    @Inject(UploadService)
    private uploadService: UploadService,
  ) {}

  @Post('/images')
  @UseInterceptors(FileInterceptor('imgFile'))
  async uploadImageFiles(@UploadedFile() file, @Body() params: any) {
    return this.uploadService.modifyImgName(params, file.fileName);
  }
}
