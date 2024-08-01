import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '@model/postgres/user/entities/user.entity';

const UserFactory = setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();

  const sexFlag = faker.number.int(1);
  user.gender = !!sexFlag;
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';
  user.username = faker.person.firstName(sex) + ' ' + faker.person.lastName(sex);
  user.role = faker.number.int(2);
  return user;
});

export { UserFactory };