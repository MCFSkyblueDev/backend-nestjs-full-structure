import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomRepository } from '@model/postgres/room/room.repository';
import { RoomEntity } from '@model/postgres/room/entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
  ) {
  }

  async create(createRoomDto: CreateRoomDto) {
    try {
      const newRoom = new RoomEntity({
        name: createRoomDto.name,
        code: createRoomDto.code,
      });
      return await this.roomRepository.save(newRoom);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateRoomCode(code: string): Promise<boolean> {
    try {
      const room = await this.roomRepository.findOne({ where: { code } });
      return !!room;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}
