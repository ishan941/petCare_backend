import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';

  import { Reflector } from '@nestjs/core';

  import { parse } from 'url';


import { JwtPayload } from 'jsonwebtoken';
import { PGDatabaseService } from '../Database/pg.database.service';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/Prisma/prisma.service';
  
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private pgDatabaseService: PGDatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    
    if (!authorizationHeader) {
      return false;
    }
    
    if (authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring('Bearer '.length);
      
      try {
        const jwtPayload: JwtPayload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        const userRole: Role[] = jwtPayload.roles;
        const userId = jwtPayload.userId; // Adjusted to use userId
        const method = request.method.toUpperCase();
        const parsedUrl = parse(request.url);
        const entireSegment = parsedUrl.pathname;
        const segments = entireSegment.split('/').filter(Boolean);
        const path = segments.length > 0 ? segments[0] : null;

        return await this.checkAuthorization(userId, userRole, path, method);
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException(
        'Invalid or missing Authorization Bearer header',
      );
    }
  }

  private async checkAuthorization(
    userId: string,
    roles: Role[],
    path: string,
    method: string,
  ): Promise<boolean> {
    try {
      const authorized = await this.pgDatabaseService.prismaRead.authorization.findFirst({
        where: {
          userId: userId, 
          role: { role: { in: roles } },
          path: { contains: path },
          method: { has: method },
        },
      });

      return !!authorized;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

    // constructor(
    //   private reflector: Reflector,
    //   private jwtService: JwtService,
    // ) {}
  
    // canActivate(context: ExecutionContext): boolean {
    //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    //     context.getHandler(),
    //     context.getClass(),
    //   ]);
    //   if (!requiredRoles) {
    //     return true;
    //   }
    //   const request: Request = context.switchToHttp().getRequest();
    //   const authorizationHeader = request.headers['authorization'];
    //   if (!authorizationHeader) {
    //     return false;
    //   }
    //   if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    //     const token = authorizationHeader.substring('Bearer '.length);
  
    //     const jwtPayload: jwtPayload = this.jwtService.verify(token, {
    //       secret: process.env.JWT_SECRET,
    //     });
    //     const userRole: Role[] = jwtPayload.roles;
    //     return requiredRoles.some((role) => userRole.includes(role));
    //   }
    // }
  }
  