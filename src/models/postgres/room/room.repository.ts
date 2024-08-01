import { BaseRepository } from '@model/postgres/base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '@model/postgres/room/entities/room.entity';

export class RoomRepository extends BaseRepository<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {
    super(
      roomRepository.target,
      roomRepository.manager,
      roomRepository.queryRunner,
    );
  }
}