import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CrawlerStatusDocument, CrawlerStatusEntity } from '@model/mongo/crawler-status/crawler-status.schema';
import { Model } from 'mongoose';
import { CreateCrawlerStatusDto } from '@model/mongo/crawler-status/dto/create-crawler-status.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CrawlerStatusService {
  constructor(
    @InjectModel(CrawlerStatusEntity.name)
    private crawlerStatusModel: Model<CrawlerStatusEntity>,
    @Inject(CACHE_MANAGER)
    private crawlerCache: Cache) {
  }


  async createCrawlerStatus(createCrawlerStatusDto: CreateCrawlerStatusDto) {
    try {
      const newCrawlerStatus: CrawlerStatusDocument = new this.crawlerStatusModel(createCrawlerStatusDto);
      // await this.crawlerCache.set('crawler-status', newCrawlerStatus, 600 * 1000);
      return await newCrawlerStatus.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCrawlerStatusByCache() {
    try {
      const crawlerStatus = await this.crawlerCache.get('crawler_status');
      console.log(crawlerStatus);
      return crawlerStatus;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}
