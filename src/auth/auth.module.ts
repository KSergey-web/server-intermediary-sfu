import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LtabModule } from 'src/ltab/ltab.module';

@Module({
  imports: [HttpModule, LtabModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
