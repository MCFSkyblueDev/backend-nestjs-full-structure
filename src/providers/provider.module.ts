import { Module } from '@nestjs/common';
import { PostgresProvider } from '@provider/database/postgres/postgres.provider';
import { MongoProvider } from '@provider/database/mongo/mongo.provider';
import { RedisCacheProvider } from '@provider/cache/redis/redis-cache.provider';
import { MulterProvider } from '@provider/multer/multer.provider';
import { JwtProvider } from '@provider/jwt/jwt.provider';


@Module({
  imports: [PostgresProvider, MongoProvider, RedisCacheProvider, MulterProvider, JwtProvider],
  exports: [PostgresProvider, MongoProvider, RedisCacheProvider, MulterProvider, JwtProvider],
})
export class ProviderModule {
}
