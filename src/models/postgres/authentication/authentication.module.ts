import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from '@model/postgres/authentication/entities/authentication.entity';
import { AuthenticationRepository } from '@model/postgres/authentication/authentication.repository';
import { UserRepository } from '@model/postgres/user/user.repository';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { CaslModule } from '@casl/casl.module';
import { MailModule } from '@mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity, UserEntity]),
    CaslModule,
    MailModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository, UserRepository],
})
export class AuthenticationModule {
}
