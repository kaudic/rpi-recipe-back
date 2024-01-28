import { Inject, Injectable } from '@nestjs/common';
import { DbqueryService } from 'src/dbquery/dbquery.service';
import {
  insertQueryGenerator,
  updateQueryGenerator,
} from '../utils/queryGenerator';
@Injectable()
export class RecipeDatamapper {
  constructor(
    @Inject(DbqueryService)
    private dbqueryService: DbqueryService,
  ) {}

  async findAll() {
    const sql = `
    SELECT * FROM detailed_recipe
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, []);
  }

  async findByPk(recipeId) {
    const sql = `
    SELECT * FROM detailed_recipe WHERE id = $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [recipeId]);
  }

  async insert(recipe) {
    const [columns, placeHolders, values] = insertQueryGenerator(recipe);
    const sql = `INSERT INTO recipe
    ${columns} VALUES
    ${placeHolders} RETURNING *`;

    return this.dbqueryService.sendRawSqlQuery(sql, values);
  }

  async update(id, recipe) {
    const [setStatement, values] = updateQueryGenerator(recipe);
    const sql = `UPDATE recipe ${setStatement} WHERE id = $1`;

    return this.dbqueryService.sendRawSqlQuery(sql, [id, ...values]);
  }

  async findAllByString(string) {
    const sql = `SELECT * FROM detailed_recipe WHERE
    LOWER(ingredients::text) like LOWER($1) 
    or LOWER(reference) like LOWER($1)
    or LOWER(title) like LOWER($1)
    or LOWER(text) like LOWER($1)`;

    return this.dbqueryService.sendRawSqlQuery(sql, [string]);
  }

  async delete(id) {
    const sql = `
    DELETE FROM recipe WHERE id = $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [id]);
  }

  async updateImgName(id, imgName) {
    const sql = `
    UPDATE recipe SET img_name=$2 WHERE id = $1 RETURNING *
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [id, imgName]);
  }
}
