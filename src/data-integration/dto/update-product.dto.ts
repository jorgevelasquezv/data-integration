import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'This property corresponds to the number of sold products',
    type: 'integer',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Min(1)
  soldProducts: number;
}
