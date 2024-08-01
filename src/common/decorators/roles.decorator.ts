// import { Reflector } from '@nestjs/core';
// export const Roles = Reflector.createDecorator<string[]>();

import { SetMetadata } from '@nestjs/common';
import { Role } from '@enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);