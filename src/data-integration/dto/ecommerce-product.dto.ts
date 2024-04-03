import { ApiProperty } from '@nestjs/swagger';

export class ECommerceProductDto {
  @ApiProperty({
    format: 'uuid',
    description: 'This property must be a valid uuid ',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    example: 'Product Name',
    description: 'This property corresponds to the title of the product',
  })
  title: string;

  @ApiProperty({
    format: 'integer',
    description: 'This property corresponds to the price of the product',
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'This property corresponds to the description of the product',
  })
  description: string;

  @ApiProperty({
    example: 'product-name',
    description:
      'This property corresponds to the tag for product name of the product',
  })
  slug: string;

  @ApiProperty({
    format: 'integer',
    description: 'This property corresponds to the stock of the product',
    default: 0,
  })
  stock: number;

  @ApiProperty({
    format: 'array',
    example: ['XS', 'S', 'XL', 'XXL'],
    description:
      'This property corresponds to the size or measurement of the product.',
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description:
      'This property relates the associated gender to that of the product.',
  })
  gender: string;

  @ApiProperty({
    format: 'array',
    example: ['shirt'],
    description: 'This property corresponds to the tag of the product.',
  })
  tags: string[];

  @ApiProperty({
    format: 'array',
    example: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
    description: 'This property corresponds to the images of the product.',
    default: [],
  })
  images: string[];
}
