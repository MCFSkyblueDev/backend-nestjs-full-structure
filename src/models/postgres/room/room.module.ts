import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '@model/postgres/room/entities/room.entity';
import { RoomRepository } from '@model/postgres/room/room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  exports : [RoomService, RoomRepository],
})
export class RoomModule {
}
