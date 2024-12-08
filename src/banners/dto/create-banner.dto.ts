import { IsString, IsDateString, IsOptional } from 'class-validator'

export class CreateBannerDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly description: string

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
