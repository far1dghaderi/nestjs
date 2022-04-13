import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDTO {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
  @IsLatitude()
  lng: number;
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
