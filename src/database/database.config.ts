import { SeederOptions } from 'typeorm-extension';
import UserSeeder from '@seeder/user.seeder';
import { UserFactory } from '@factory/user.factory';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { ItemEntity } from '@model/postgres/item/entities/item.entity';
import { StoreEntity } from '@model/postgres/store/entities/store.entity';
import * as process from 'node:process';
import { AuthenticationEntity } from '@model/postgres/authentication/entities/authentication.entity';

config();


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DATABASE,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  entities: [UserEntity, ItemEntity, StoreEntity, AuthenticationEntity],
  synchronize: true,
};

export const seederOptions: SeederOptions = {
  seeds: [UserSeeder],
  factories: [UserFactory],
};
