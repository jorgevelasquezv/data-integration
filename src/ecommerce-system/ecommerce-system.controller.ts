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

import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateProductDto, UpdateProductDto } from '../data-integration/dto';
import { Response } from 'express';
import { LegacySystemService } from '../legacy-system/legacy-system.service';
import { FilesService } from '../data-integration/files.service';
import { ECommerceProductDto } from 'src/data-integration/dto';
import {
  ApiCreateProduct,
  ApiFindPaginatedProducts,
  ApiFindProduct,
  ApiUpdateStockProduct,
} from './decorators';

@ApiTags('Products')
@Controller('products')
export class ECommerceSystemController {
  constructor(
    private readonly legacySystemService: LegacySystemService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @ApiCreateProduct()
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ECommerceProductDto> {
    return this.legacySystemService.create(createProductDto);
  }

  @Get()
  @ApiFindPaginatedProducts()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<ECommerceProductDto[]> {
    return this.legacySystemService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiFindProduct()
  findOne(@Param('term') term: string): Promise<ECommerceProductDto> {
    return this.legacySystemService.findOne(term);
  }

  @Put(':id')
  @ApiUpdateStockProduct()
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
