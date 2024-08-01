import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsString()
  @ApiProperty({ description: 'The name of the room', example: 'Erttt' })
  name: string;

  @IsString()
  @Length(6, 6)
  @ApiProperty({ description: 'The code of the room', example: '1wer44' })
  code: string;
}
