import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ECommerceProductDto } from 'src/data-integration/dto';

export function ApiUpdateStockProduct() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Stock Of Product',
      operationId: 'update',
      description: 'This endpoint is used to update the stock of a product.',
    }),
    ApiResponse({
      status: 200,
      description: 'Update stock of Product by id',
      type: ECommerceProductDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Product not found',
      schema: {
        example: {
          message:
            'Product with id: ae2fa67e-6cd7-44cf-80ec-7600da4c2447 not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        example: {
          message: 'Invalid number of products sold, exceeds stock quantity',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}
