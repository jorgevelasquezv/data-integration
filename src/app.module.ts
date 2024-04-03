import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ECommerceSystemModule } from './ecommerce-system/ecommerce-system.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { LegacySystemModule } from './legacy-system/legacy-system.module';
import { DataIntegrationModule } from './data-integration/data-integration.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: 'static/products',
    }),
    ECommerceSystemModule,
    CommonModule,
    SeedModule,
    LegacySystemModule,
    DataIntegrationModule,
    FiltersModule,
  ],
})
export class AppModule {}
