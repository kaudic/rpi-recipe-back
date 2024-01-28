import { Inject, Injectable } from '@nestjs/common';
import { DbqueryService } from 'src/dbquery/dbquery.service';

@Injectable()
export class RecipeDatamapper {
  constructor(
    @Inject(DbqueryService)
    private dbqueryService: DbqueryService,
  ) {}

  async updateImgName(id, imgName) {
    const sql = `
    UPDATE recipe SET img_name=$2 WHERE id = $1 RETURNING *
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [id, imgName]);
  }

  async findAllByString(searchString) {
    const sql = `
    SELECT * FROM recipe WHERE name ILIKE $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [searchString]);
  }
}
