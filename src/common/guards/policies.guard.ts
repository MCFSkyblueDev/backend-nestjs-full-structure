import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY, RequiredRule } from '@decorator/policies.decorator';
import { AppAbility, CaslAbilityFactory } from '@casl/casl-ability.factory';
import { ForbiddenError } from '@casl/ability';


@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<RequiredRule[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);
    try {
      policyHandlers.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject));
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    // return policyHandlers.every((handler) =>
    //   this.execPolicyHandler(handler, ability),
    // );
  }

  // private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
  //   if (typeof handler === 'function') {
  //     console.log(handler(ability));
  //     return handler(ability);
  //   }
  //   return handler.handle(ability);
  // }
}

