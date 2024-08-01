import { Module } from '@nestjs/common';
import { CrawlerStatusModule } from '@model/mongo/crawler-status/crawler-status.module';


@Module({
  imports: [
    CrawlerStatusModule,
  ],
  exports: [CrawlerStatusModule],
})
export class MongoModelModule {

}