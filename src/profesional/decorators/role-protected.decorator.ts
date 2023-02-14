import { SetMetadata } from '@nestjs/common';
import { RolesUsuario } from '../interfaces/user-roles.interface';

export const USER_ROLES = 'roles';

export const RoleProtected = (...args: RolesUsuario[]) => {
  return SetMetadata(USER_ROLES, args);
};
