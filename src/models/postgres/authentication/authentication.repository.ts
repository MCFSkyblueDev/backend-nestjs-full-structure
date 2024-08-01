import { BaseRepository } from '@model/postgres/base/base.repository';
import { AuthenticationEntity } from '@model/postgres/authentication/entities/authentication.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



export class AuthenticationRepository extends BaseRepository<AuthenticationEntity> {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private authenticationRepository: Repository<AuthenticationEntity>,
  ) {
    super(
      authenticationRepository.target,
      authenticationRepository.manager,
      authenticationRepository.queryRunner,
    );
  }
  async findByUsername(username: string): Promise<AuthenticationEntity> {
    try {
      return await this.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}