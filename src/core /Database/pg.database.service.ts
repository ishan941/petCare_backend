import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PGDatabaseService implements OnModuleInit {
  prismaRead: PrismaClient;
  prismaWrite: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prismaRead = new PrismaClient({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
      log: ['query'], 
    });

    this.prismaWrite = new PrismaClient({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.prismaRead.$connect();
    await this.prismaWrite.$connect();
  }
}
