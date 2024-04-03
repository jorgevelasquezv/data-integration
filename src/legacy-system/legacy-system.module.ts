import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LegacySystemService } from './legacy-system.service';
import { Product, ProductImage } from './entities';
import { DataIntegrationModule } from 'src/data-integration/data-integration.module';

@Module({
  providers: [LegacySystemService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    DataIntegrationModule,
  ],
  exports: [LegacySystemService],
})
export class LegacySystemModule {}
