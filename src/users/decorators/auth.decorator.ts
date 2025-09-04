import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import { UserRoleGuard } from "../guards/user-role.guard";
// import { ValidRoles } from "../interfaces";
// import { RoleProtected } from './';

// export function Auth(...roles: ValidRoles[]) {
export function Auth() {
    return applyDecorators(
    //   RoleProtected(...roles),
    //   UseGuards(AuthGuard(), UserRoleGuard)
      UseGuards(AuthGuard())
    );
  }