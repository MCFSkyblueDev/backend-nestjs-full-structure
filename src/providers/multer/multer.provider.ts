import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';


@Module({
  imports: [
    MulterModule.register({
      // dest: './upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../', 'images'),
      serveRoot: '/images',
    }),
  ],
})
export class MulterProvider {

}
