import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CrawlerStatusDocument = HydratedDocument<CrawlerStatusEntity>;

@Schema({ timestamps: true , collection : "crawler-status"})
export class CrawlerStatusEntity {
  @Prop()
  contractName: string;

  @Prop()
  contractAddress: string;

  @Prop({ required: true })
  eventSeq: number;

  @Prop({ default: Date.now() })
  blockTimestamp: Date;
}

export const CrawlerStatusSchema = SchemaFactory.createForClass(CrawlerStatusEntity);