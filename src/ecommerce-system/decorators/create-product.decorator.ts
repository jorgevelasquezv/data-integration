import { applyDecorators } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ECommerceProductDto } from 'src/data-integration/dto';

export function ApiCreateProduct() {
  return applyDecorators(
    ApiExcludeEndpoint(),
    ApiOperation({
      summary: 'Create Product',
      operationId: 'create',
      description: 'This endpoint is used to create a new product.',
    }),
    ApiResponse({
      status: 201,
      description: 'Products was created',
      type: ECommerceProductDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        example: {
          message: [
            'title must be longer than or equal to 1 characters',
            'title must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}
