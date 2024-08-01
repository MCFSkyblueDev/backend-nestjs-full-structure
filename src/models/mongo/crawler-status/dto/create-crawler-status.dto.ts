import { IsDefined, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCrawlerStatusDto {

  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The name of the contract', example: 'Market' })
  contractName: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'The address of the contract', example: 'dadadadadasd' })
  contractAddress: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty({ description: 'The current block number of the contract', example: 12 })
  eventSeq: number;

  // @IsDate()
  // @IsDefined()
  // @ApiProperty({ description: 'The block timestamp of the contract', example: 'Market' })
  // blockTimestamp: Date;

}