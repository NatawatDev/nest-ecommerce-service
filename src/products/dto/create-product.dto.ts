import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateProductDto {
  @IsString()
  readonly name: string

  @IsString()
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
