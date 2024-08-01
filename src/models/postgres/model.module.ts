import { Module } from '@nestjs/common';
import { StoreModule } from '@model/postgres/store/store.module';
import { ItemModule } from '@model/postgres/item/item.module';
import { UserModule } from '@model/postgres/user/user.module';
import { AuthenticationModule } from '@model/postgres/authentication/authentication.module';
import { RoomModule } from '@model/postgres/room/room.module';

@Module({
  imports: [
    UserModule, StoreModule, ItemModule, AuthenticationModule, RoomModule,
  ],
  exports: [
    UserModule, StoreModule, ItemModule, AuthenticationModule, RoomModule,
  ],
})
export class PostgresModelModule {
}