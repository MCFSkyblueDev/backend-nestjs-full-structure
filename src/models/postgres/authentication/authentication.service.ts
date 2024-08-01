import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthenticationRepository } from '@model/postgres/authentication/authentication.repository';
import { AuthenticationEntity } from '@model/postgres/authentication/entities/authentication.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@model/postgres/user/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { SignupDto } from '@model/postgres/authentication/dto/signup.dto';
import { MailService } from '@mail/mail.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly authenticationRepository: AuthenticationRepository,
              private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService,
              private readonly dataSource: DataSource,
              private readonly mailService: MailService,
  ) {
  }

  async login(user: LoginDto): Promise<any> {

    const fetchedAuth: AuthenticationEntity | null = await this.authenticationRepository.findByUsername(user.username);
    if (!fetchedAuth) {
      throw new NotFoundException('Invalid username or password. Please try again.');
    }
    const isMatch: boolean = await bcrypt.compare(user.password, fetchedAuth.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid username or password. Please try again.');
    }
    try {
      const userEntity: UserEntity = await this.userRepository.findOne({ where: { username: fetchedAuth.username } });
      const payload = {
        id: userEntity.id,
        username: userEntity.username,
        gender: userEntity.gender ? 'male' : 'female',
        role: userEntity.role,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  async signup(user: SignupDto): Promise<any> {
    const fetchedUser: AuthenticationEntity | null = await this.authenticationRepository.findByUsername(user.username);
    if (fetchedUser) {
      console.log(fetchedUser);
      throw new ConflictException('Username \'' + user.username + '\' has already been registered');
    }

    const newUser: UserEntity = new UserEntity({
      username: user.username,
      email: user.email,
      gender: user.gender,
      role: user.role,
    });
    const hashPassword = await bcrypt.hash(user.password, 10);
    const newLogin: AuthenticationEntity = new AuthenticationEntity({
      username: user.username,
      password: hashPassword,
      email: user.email,
    });
    if (newUser.email) {
      try {
        await this.mailService.sendUserConfirmation(newUser, 'p');
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(error);
      }
    }

    // ? Transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(UserEntity, newUser);
      await queryRunner.manager.save(AuthenticationEntity, newLogin);
      await queryRunner.commitTransaction();
      return 'Sign up successfully with username' + user.username;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getProfile(id: number): Promise<any> {
    if (!id) {
      throw new UnauthorizedException('You are not authorized.');
    }
    let userInfo: UserEntity | null;
    try {
      userInfo = await this.userRepository.findOne({ where: { id }, relations: ['stores'] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!userInfo) {
      throw new NotFoundException('Can not get profile of user has id=' + id);
    }
    return userInfo;
  }


}
