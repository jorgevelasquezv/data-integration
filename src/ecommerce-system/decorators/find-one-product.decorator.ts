import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ECommerceProductDto } from 'src/data-integration/dto';

export function ApiFindProduct() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find Product',
      operationId: 'find',
      description:
        'This endpoint is used to find a product by name, id or slug.',
    }),
    ApiResponse({
      status: 200,
      description: 'Find one Product for name, id or slug',
      type: ECommerceProductDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Product not found',
      schema: {
        example: {
          message:
            'Product with term Men’s Chill Crew Neck Sweatshirt1 not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  );
}
