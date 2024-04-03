import { Module } from '@nestjs/common';
import { ECommerceSystemController } from './ecommerce-system.controller';
import { LegacySystemModule } from 'src/legacy-system/legacy-system.module';
import { DataIntegrationModule } from 'src/data-integration/data-integration.module';

@Module({
  controllers: [ECommerceSystemController],
  imports: [LegacySystemModule, DataIntegrationModule],
  exports: [],
})
export class ECommerceSystemModule {}
