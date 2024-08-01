// import { BaseRepository } from '@model/base/base.repository';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@model/postgres/base/base.repository';
import { InternalServerErrorException } from '@nestjs/common';


export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}