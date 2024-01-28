import { Module } from '@nestjs/common';
import { DbqueryService } from './dbquery.service';

@Module({
  providers: [DbqueryService],
  exports: [DbqueryService],
})
export class DbqueryModule {}
