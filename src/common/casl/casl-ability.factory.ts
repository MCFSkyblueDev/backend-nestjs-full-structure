import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  InferSubjects,
  MongoQuery,
  MongoAbility,
  createMongoAbility,
  ExtractSubjectType,

} from '@casl/ability';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { Action } from '@enum/action.enum';
import { StoreEntity } from '@model/postgres/store/entities/store.entity';
import { ItemEntity } from '@model/postgres/item/entities/item.entity';


export type Subjects = InferSubjects<typeof UserEntity | typeof StoreEntity | typeof ItemEntity> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);

    // User
    if (user.role === 0) {
      can([Action.Read], StoreEntity);
      cannot([Action.Read], UserEntity);
      cannot([Action.Update, Action.Create], 'all');
    }

    // Store Owner
    if (user.role === 1) {
      can([Action.Read, Action.Create, Action.Delete], StoreEntity, { user: user });
      cannot([Action.Read], UserEntity);
    }

    // Admin
    if (user.role === 2) {
      can(Action.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}