import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RolesUsuario } from '../interfaces/user-roles.interface';
import { RoleProtected } from './role-protected.decorator';
export function Auth(...roles: RolesUsuario[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
