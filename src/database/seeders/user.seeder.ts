import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthenticationEntity } from '@model/postgres/authentication/entities/authentication.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userFactory = factoryManager.get(UserEntity);
    const users = await userFactory.saveMany(20);
    for (const user of users) {
      const hashedPassword = await bcrypt.hash('111111', 10);
      const authEntity = new AuthenticationEntity({ username: user.username, password: hashedPassword });
      await dataSource.getRepository(AuthenticationEntity).save(authEntity);
    }
  }
}