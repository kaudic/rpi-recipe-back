import { Controller, Post, Body, Inject } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('api/upload')
export class RecipeController {
  constructor(
    @Inject(RecipeService)
    private recipeService: RecipeService,
  ) {}

  @Post('')
  async search(
    @Body()
    params: any,
  ) {
    this.recipeService.search(params);
    return { message: 'Image upload started' };
  }
}
