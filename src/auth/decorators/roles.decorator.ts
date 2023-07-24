import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/model/enum/role.enum';


export const HasRoles = ( ...roles: Role[] ) => SetMetadata('roles', roles);