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
import { RecipeService } from './recipe.service';
import { RecipeDatamapper } from './recipe.datamapper';

@Controller('api/recipe')
export class RecipeController {
  constructor(
    @Inject(RecipeService)
    private recipeService: RecipeService,

    @Inject(RecipeDatamapper)
    private recipeDatamapper: RecipeDatamapper,
  ) {}

  @Get('')
  async findAll() {
    return this.recipeDatamapper.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.recipeDatamapper.findByPk(id);
  }

  @Post('')
  async create(
    @Body()
    params: any,
  ) {
    return this.recipeService.create(params);
  }

  @Put()
  async update(
    @Body()
    params: any,
  ) {
    return this.recipeService.update(params);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.recipeDatamapper.delete(id);
  }

  @Post('')
  async search(
    @Body()
    params: any,
  ) {
    return this.recipeService.search(params);
  }
}
