import { Inject, Injectable } from '@nestjs/common';
import { DbqueryService } from 'src/dbquery/dbquery.service';
import {
  insertQueryGenerator,
  updateQueryGenerator,
} from '../utils/queryGenerator';
@Injectable()
export class RecipeIngredientDatamapper {
  constructor(
    @Inject(DbqueryService)
    private dbqueryService: DbqueryService,
  ) {}

  async findByPk(recipeId) {
    const sql = `
    SELECT * FROM recipe_ingredient WHERE recipe_id = $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [recipeId]);
  }

  async insert(recipeIngredientUnitLink) {
    const [columns, placeHolders, values] = insertQueryGenerator(
      recipeIngredientUnitLink,
    );
    const sql = `INSERT INTO recipe_ingredient
    ${columns} VALUES
    ${placeHolders} RETURNING *`;

    return this.dbqueryService.sendRawSqlQuery(sql, values);
  }

  async update(recipeId, ingredientId, recipeIngredientUnitAndQty) {
    const [setStatement, values] = updateQueryGenerator(
      recipeIngredientUnitAndQty,
      { countStarter: 3 },
    );
    const sql = `UPDATE recipe_ingredient ${setStatement} WHERE recipe_id = $1 AND ingredient_id=$2`;

    return this.dbqueryService.sendRawSqlQuery(sql, [
      recipeId,
      ingredientId,
      ...values,
    ]);
  }

  async delete(recipeId, ingredientId) {
    const sql = `
    DELETE FROM recipe_ingredient WHERE recipe_id = $1 AND ingredient_id=$2
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [recipeId, ingredientId]);
  }
}
