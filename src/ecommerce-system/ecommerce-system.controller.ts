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
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateProductDto, UpdateProductDto } from '../data-integration/dto';
import { Response } from 'express';
import { LegacySystemService } from '../legacy-system/legacy-system.service';
import { FilesService } from '../data-integration/files.service';
import { ECommerceProductDto } from 'src/data-integration/dto';

@ApiTags('Products')
@Controller('products')
export class ECommerceSystemController {
  constructor(
    private readonly legacySystemService: LegacySystemService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'Create Product',
    operationId: 'create',
    description: 'This endpoint is used to create a new product.',
  })
  @ApiResponse({
    status: 201,
    description: 'Products was created',
    type: ECommerceProductDto,
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
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ECommerceProductDto> {
    return this.legacySystemService.create(createProductDto);
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
    type: [ECommerceProductDto],
  })
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<ECommerceProductDto[]> {
    return this.legacySystemService.findAll(paginationDto);
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
    type: ECommerceProductDto,
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
  findOne(@Param('term') term: string): Promise<ECommerceProductDto> {
    return this.legacySystemService.findOne(term);
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
    type: ECommerceProductDto,
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
  ): Promise<ECommerceProductDto> {
    return this.legacySystemService.update(id, updateProductDto);
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
  findFile(@Res() res: Response, @Param('imageName') imageName: string): void {
    const path = this.filesService.getStaticFile(imageName);

    res.sendFile(path);
  }
}
