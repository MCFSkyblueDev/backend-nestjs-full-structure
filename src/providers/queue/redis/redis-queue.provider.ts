import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow('QUEUE_HOST'),
          port: configService.getOrThrow('QUEUE_PORT'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
})
export class RedisQueueProviderModule {

}
