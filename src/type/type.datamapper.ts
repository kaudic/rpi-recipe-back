import { Inject, Injectable } from '@nestjs/common';
import { DbqueryService } from 'src/dbquery/dbquery.service';
import {
  insertQueryGenerator,
  updateQueryGenerator,
} from '../utils/queryGenerator';
@Injectable()
export class TypeDatamapper {
  constructor(
    @Inject(DbqueryService)
    private dbqueryService: DbqueryService,
  ) {}

  async findAll() {
    const sql = `
    SELECT * FROM type
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, []);
  }

  async findByPk(typeId) {
    const sql = `
    SELECT * FROM type WHERE id = $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [typeId]);
  }

  async create(type) {
    const [columns, placeHolders, values] = insertQueryGenerator(type);
    const sql = `INSERT INTO type
    ${columns} VALUES
    ${placeHolders} RETURNING *`;

    return this.dbqueryService.sendRawSqlQuery(sql, values);
  }

  async update(id, type) {
    const [setStatement, values] = updateQueryGenerator(type);
    const sql = `UPDATE type ${setStatement} WHERE id = $1 RETURNING *`;

    return this.dbqueryService.sendRawSqlQuery(sql, [id, ...values]);
  }

  async delete(id) {
    const sql = `
    DELETE FROM type WHERE id = $1
    `;
    return this.dbqueryService.sendRawSqlQuery(sql, [id]);
  }
}
