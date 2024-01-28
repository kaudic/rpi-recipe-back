import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TypeDatamapper } from './type.datamapper';

@Controller('api/type')
export class TypeController {
  constructor(
    @Inject(TypeDatamapper)
    private typeDatamapper: TypeDatamapper,
  ) {}

  @Get('')
  async findAll() {
    return this.typeDatamapper.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.typeDatamapper.findByPk(id);
  }

  @Post('')
  async create(
    @Body()
    params: any,
  ) {
    return this.typeDatamapper.create(params);
  }

  @Put()
  async update(
    @Body()
    params: any,
  ) {
    const { id, type } = params;
    return this.typeDatamapper.update(id, type);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.typeDatamapper.delete(id);
  }
}
