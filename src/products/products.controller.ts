import { FilesService } from './files.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Product',
    operationId: 'create',
    description: 'This endpoint is used to create a new product.',
  })
  @ApiResponse({
    status: 201,
    description: 'Products was created',
    type: Product,
  })
  @ApiResponse({
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
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List Products',
    operationId: 'list',
    description: 'This endpoint is used to list paginated products.',
  })
  @ApiResponse({
    status: 200,
    description: 'List all Products',
    type: Product,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({
    summary: 'Find Product',
    operationId: 'find',
    description: 'This endpoint is used to find a product by name, id or slug.',
  })
  @ApiResponse({
    status: 200,
    description: 'Find one Product for name, id or slug',
    type: Product,
  })
  @ApiResponse({
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
  })
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update Stock Of Product',
    operationId: 'update',
    description: 'This endpoint is used to update the stock of a product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Update stock of Product by id',
    type: Product,
  })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        message: 'Invalid number of products sold, exceeds stock quantity',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get('image/:imageName')
  @ApiOperation({
    summary: 'Find Image',
    operationId: 'findImage',
    description: 'This endpoint is used to find an image by name.',
  })
  @ApiResponse({
    status: 200,
    description: 'Find image by name',
  })
  @ApiResponse({
    status: 404,
    description: 'Image not found',
    schema: {
      example: {
        message: 'File with name: 1740250-00-A_0_20001.jpg not found',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  findFile(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticFile(imageName);

    res.sendFile(path);
  }
}
