import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_URI'),
      }),
    }),
    // MongooseModule.forRoot('mongodb://localhost/users', {
    //   connectionName: 'nestjs',
    // }),
  ],
})
export class MongoProvider {
}
