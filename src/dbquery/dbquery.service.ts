import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DbqueryService {
  constructor(private connection: Connection) {}

  public async sendRawSqlQuery(sql: string, placeholders: any[]): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // Send request
    const result = await queryRunner.query(sql, placeholders);

    // Close connection
    await queryRunner.release();

    // Return result from query
    return result;
  }
}
