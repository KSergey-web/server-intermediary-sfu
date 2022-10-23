import { Module } from '@nestjs/common';
import { LtabService } from './ltab.service';

@Module({
  providers: [LtabService],
  exports: [LtabService],
})
export class LtabModule {}
