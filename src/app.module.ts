import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from '@provider/provider.module';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { CorsMiddleware } from '@middleware/cors.middleware';
import { ModelModule } from '@model/model.module';
import { StarknetModule } from '@starknet/starknet.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ModelModule,
    ProviderModule,
    StarknetModule,
    // AppConfigService,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],


})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CorsMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
