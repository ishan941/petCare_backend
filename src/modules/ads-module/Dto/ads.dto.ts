import { IsOptional, IsString, IsInt } from 'class-validator';

export class AdsDto {
  @IsOptional()
  @IsString()
  adsImage?: string;

  @IsOptional()
  @IsInt()
  id?: number;
}
