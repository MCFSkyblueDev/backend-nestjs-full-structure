import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlerStatusEntity, CrawlerStatusSchema } from '@model/mongo/crawler-status/crawler-status.schema';
import { CrawlerStatusService } from '@model/mongo/crawler-status/crawler-status.service';
import { CrawlerStatusController } from '@model/mongo/crawler-status/crawler-status.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CrawlerStatusEntity.name, schema: CrawlerStatusSchema }]),
  ],
  providers: [CrawlerStatusService],
  controllers: [CrawlerStatusController],
})
export class CrawlerStatusModule {

}
