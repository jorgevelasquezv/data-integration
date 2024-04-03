import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { LegacySystemModule } from 'src/legacy-system/legacy-system.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [LegacySystemModule],
})
export class SeedModule {}
