import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeDatamapper } from './type.datamapper';
import { DbqueryModule } from 'src/dbquery/dbquery.module';

@Module({
  imports: [DbqueryModule],
  controllers: [TypeController],
  providers: [TypeDatamapper],
})
export class TypeModule {}
