import { Inject, Injectable } from '@nestjs/common';
import { RecipeDatamapper } from './recipe.datamapper';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(RecipeDatamapper)
    private recipeDatamapper: RecipeDatamapper,
  ) {}

  async modifyImgName(params, imgName) {
    const { recipeId } = params;
    return await this.recipeDatamapper.updateImgName(recipeId, imgName);
  }

  async search(params) {
    const { searchString } = params;
    const stringShapedForQuery = '%' + searchString + '%';
    return await this.recipeDatamapper.findAllByString(stringShapedForQuery);
  }
}
