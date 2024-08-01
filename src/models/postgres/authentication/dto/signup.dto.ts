import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { IsBoolean, IsDefined, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto extends PartialType(LoginDto) {
  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The username of the user', example: 'Kevin Lop' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: 'The username of the user', example: 'phongite7congnghethongtin@gmail.com' })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The password of the user', example: '11111' })
  password: string;

  @Transform(({ value }) => (!!value))
  @IsBoolean()
  @IsDefined()
  @ApiProperty({ description: 'The gender of the user (write in form of boolean)', example: true })
  gender: boolean;

  @IsDefined()
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The role of the user (write in form of number from 1 to 3)', example: 1 })
  role: Role;


}
