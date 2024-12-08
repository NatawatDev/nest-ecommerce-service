import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateBannerDto {
  @IsString()
  readonly id: string

  @IsString()
  @IsOptional()
  readonly name: string

  @IsString()
  @IsOptional()
  readonly description: string

  @IsNumber()
  readonly displayOrder: number

  @IsString()
  @IsOptional()
  readonly files: Express.Multer.File

  @IsDateString()
  @IsOptional()
  readonly createdAt?: Date

  @IsDateString()
  @IsOptional()
  readonly updatedAt?: Date
}

export class UpdateDisplayOrderDto {
  @IsNumber()
  readonly displayOrder: number
}