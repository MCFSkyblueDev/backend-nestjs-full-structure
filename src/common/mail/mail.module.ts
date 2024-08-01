import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// @Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAILER_HOST'),
          port: configService.getOrThrow('MAILER_PORT'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAILER_USERNAME'),
            pass: configService.getOrThrow('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new HandlebarsAdapter()
          options: {
            strict: true,
          },
        },
      }),

    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
}
