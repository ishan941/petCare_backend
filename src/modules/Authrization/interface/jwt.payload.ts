import { Role } from '@prisma/client';


export interface jwtPayload {
  sub: string;
  user: string;
  email: string;
  roles: Role[];
}
