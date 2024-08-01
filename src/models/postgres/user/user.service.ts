import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '@model/postgres/user/user.repository';
import { UserEntity } from '@model/postgres/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity | HttpException> {
    try {
      return this.usersRepository.save(createUserDto);
    } catch (error) {
      return new InternalServerErrorException(error);
    }

  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return this.usersRepository.getAll();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      return this.usersRepository.getById(id);
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existUser = await this.usersRepository.findOne({ where: { id } });
      Object.assign(existUser, updateUserDto);
      return this.usersRepository.save(existUser);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.usersRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}
