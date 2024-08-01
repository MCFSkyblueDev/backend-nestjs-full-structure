import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
// import {z} from 'zod';
//
// export const createUserScheme = z.object({
//   username : z.string(),
//   gender : z.boolean(),
//   role : z.number()
// })
// export type CreateCatDto = z.infer<typeof createUserScheme>;

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user', example: 'Kevin Lop' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'The email of the user', example: 'phongite7congnghethongtin@gmail.com' })
  email: string;

  @Transform(({ value }) => (!!value))
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'The gender of the user', example: true })
  gender: boolean;

  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The role of the user (0,1 or 2)', example: 0 })
  role: number;
}
