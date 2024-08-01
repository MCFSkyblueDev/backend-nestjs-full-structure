import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CrawlerStatusService } from '@model/mongo/crawler-status/crawler-status.service';
import { CreateCrawlerStatusDto } from '@model/mongo/crawler-status/dto/create-crawler-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('crawler-status')
@ApiTags('Crawler Status')
export class CrawlerStatusController {
  @Post()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('crawler_status3')
  @CacheTTL(40*1000)
  async create(@Body() createCrawlerStatusDto: CreateCrawlerStatusDto) {
    return await this.crawlerStatusService.createCrawlerStatus(createCrawlerStatusDto);
  }

  constructor(private readonly crawlerStatusService: CrawlerStatusService) {
  }

  @Get('/cache')
  async getFromCache() {
    return await this.crawlerStatusService.getCrawlerStatusByCache();
  }
}
