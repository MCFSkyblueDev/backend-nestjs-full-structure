import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The username of the user', example: 'Kevin Lop' })
  username: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The password of the user', example: '123456yuj' })
  password: string;
}
