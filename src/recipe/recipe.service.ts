import { Inject, Injectable } from '@nestjs/common';
import { RecipeDatamapper } from './recipe.datamapper';
import { RecipeIngredientDatamapper } from './recipe-ingredient.datamapper';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(RecipeDatamapper)
    private recipeDatamapper: RecipeDatamapper,

    @Inject(RecipeIngredientDatamapper)
    private recipeIngredientDatamapper: RecipeIngredientDatamapper,
  ) {}

  async modifyImgName(params, imgName) {
    const { recipeId } = params;
    return await this.recipeDatamapper.updateImgName(recipeId, imgName);
  }

  async create(params) {
    const { ingredients } = params;
    const savedRecipe = await this.recipeDatamapper.insert(params);

    const queries = [];
    const recipeId = savedRecipe.id;
    ingredients.forEach(({ id: ingredientId, qty, unitId }) => {
      queries.push(
        this.recipeIngredientDatamapper.insert({
          recipeId,
          ingredientId,
          qty,
          unitId,
        }),
      );
    });
    await Promise.all(queries);
    return await this.recipeDatamapper.findByPk(recipeId);
  }

  async update(params) {
    const { id: recipeId, recipe } = params;
    const { ingredients } = recipe;
    delete recipe.ingredients;

    // update recipe from main table recipe
    await this.recipeDatamapper.update(recipeId, recipe);

    // update the links between recipes and ingredients in a jump table
    const recipeIngredientLinks =
      await this.recipeIngredientDatamapper.findByPk(recipeId);
    const queries = [];

    // first: get all current links in the table and then iterate through current provided links to create or update
    ingredients.forEach(({ id: ingredientId, qty, unitId }) => {
      const isIngredient = recipeIngredientLinks
        .map((x) => x.ingredient_id)
        .includes(ingredientId);
      if (isIngredient) {
        queries.push(
          this.recipeIngredientDatamapper.update(recipeId, ingredientId, {
            qty,
            unitId,
          }),
        );
      } else {
        queries.push(
          this.recipeIngredientDatamapper.insert({
            recipeId,
            ingredientId,
            qty,
            unitId,
          }),
        );
      }
    });
    // second: iterate through current links and check if they exist in new provided links
    recipeIngredientLinks.forEach(({ ingredient_id: ingredientId }) => {
      const isIngredient = ingredients.map((x) => x.id).includes(ingredientId);
      if (!isIngredient) {
        queries.push(
          this.recipeIngredientDatamapper.delete(recipeId, ingredientId),
        );
      }
    });

    // execute all the queries (create, update and delete)
    Promise.all([queries]);

    // return complete updated Recipe
    return await this.recipeDatamapper.findByPk(recipeId);
  }

  async search(params) {
    const { searchString } = params;
    const stringShapedForQuery = '%' + searchString + '%';
    return await this.recipeDatamapper.findAllByString(stringShapedForQuery);
  }
}
