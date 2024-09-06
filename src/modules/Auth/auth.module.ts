import { Module } from '@nestjs/common';

import { AuthController } from './controller/auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth/auth.service';
import { JwtStrategy } from '../Strategy';
import { PGDatabaseService } from 'src/core /Database/pg.database.service';
import { PrismaService } from '../Prisma/prisma.service';
import { AuthRepo } from './Repo/auth.repo';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthRepo,
    PrismaService,
    PGDatabaseService,
  ],
  exports: [AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
