import { Inject, Injectable } from '@nestjs/common';
import { RecipeService } from 'src/recipe/recipe.service';

@Injectable()
export class UploadService {
  constructor(
    @Inject(RecipeService)
    private recipeService: RecipeService,
  ) {}

  async modifyImgName(params, imgName) {
    this.recipeService.modifyImgName(params, imgName);
  }
}
