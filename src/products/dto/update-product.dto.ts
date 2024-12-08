import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  readonly name: string

  @IsString()
  @IsOptional()
  readonly description: string

  @IsNumber()
  @IsOptional()
  readonly price: number

  @IsNumber()
  @IsOptional()
  readonly quantity: number

  @IsString()
  @IsOptional()
  readonly file: Express.Multer.File

  @IsDateString()
  @IsOptional()
  readonly createdAt: Date

  @IsDateString()
  @IsOptional()
  readonly updatedAt: Date
}
