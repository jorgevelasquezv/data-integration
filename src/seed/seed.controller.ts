import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
