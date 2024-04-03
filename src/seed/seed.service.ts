import { Injectable } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.deleteTables();

    const { products } = initialData;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    });

    Promise.all(insertPromises);

    return { message: 'Seed executed' };
  }

  private async deleteTables() {
    await this.productService.deletedAllProducts();
  }
}
