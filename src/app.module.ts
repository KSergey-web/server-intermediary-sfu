import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipment/equipment.module';
import { SubgroupStrapiModule } from './strapi/subgroup/subgroup-strapi.module';
import { UsersStrapiModule } from './strapi/users-strapi/users-strapi.module';
import { SessionModule } from './strapi/session/session.module';

@Module({
  imports: [
    EquipmentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SubgroupStrapiModule,
    UsersStrapiModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
