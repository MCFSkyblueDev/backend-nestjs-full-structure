import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username: string;

  @Transform(({ value }) => (!!value))
  @IsBoolean()
  @IsOptional()
  gender: boolean;

  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsOptional()
  role: number;
}
