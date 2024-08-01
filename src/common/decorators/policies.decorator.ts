import { SetMetadata } from '@nestjs/common';
import { Action } from '@enum/action.enum';
import { Subjects } from '@casl/casl-ability.factory';
import { UserEntity } from '@model/postgres/user/entities/user.entity';

export interface RequiredRule {
  action: Action,
  subject: Subjects
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (handlers: RequiredRule[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

export class ReadUserAbility implements RequiredRule {
  action: Action.Read;
  subject: UserEntity;
}