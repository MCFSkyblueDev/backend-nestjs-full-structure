import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { UserRepository } from '@model/postgres/user/user.repository';
import { CaslModule } from '@casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CaslModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {

}
