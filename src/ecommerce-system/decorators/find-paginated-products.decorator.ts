import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ECommerceProductDto } from 'src/data-integration/dto';

export function ApiFindPaginatedProducts() {
  return applyDecorators(
    ApiOperation({
      summary: 'List Products',
      operationId: 'list',
      description: 'This endpoint is used to list paginated products.',
    }),
    ApiResponse({
      status: 200,
      description: 'List all Products',
      type: [ECommerceProductDto],
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        example: {
          message: ['offset must not be less than 0'],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}
