import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl : 200,
        store: redisStore,
        host: configService.getOrThrow('REDIS_HOST'),
        port: configService.getOrThrow('REDIS_PORT'),
        username: configService.getOrThrow('REDIS_USERNAME'),
        password: configService.getOrThrow('REDIS_PASSWORD'),
        // no_ready_check: true,
      }),
      isGlobal: true,
    }),
  ],
})
export class RedisCacheProvider {

}
