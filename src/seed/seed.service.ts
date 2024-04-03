import { Injectable } from '@nestjs/common';

import { initialData } from './data/seed-data';
import { LegacySystemService } from 'src/legacy-system/legacy-system.service';

@Injectable()
export class SeedService {
  constructor(private readonly legacySystemService: LegacySystemService) {}

  async runSeed() {
    await this.deleteTables();

    const { products } = initialData;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.legacySystemService.create(product));
    });

    Promise.all(insertPromises);

    return { message: 'Seed executed' };
  }

  private async deleteTables() {
    await this.legacySystemService.deletedAllProducts();
  }
}
