import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdsServiceService } from './service/ads-service.service';
import { AdsRepo } from './Repo/ads.repo';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { PGDatabaseService } from 'src/core/Database/pg.database.service';

@Module({
  imports: [

    // file saving
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploaded files
      serveRoot: '/uploads', // URL path to access the files
    }),
    // other imports
  ],
  controllers: [AdsController],
  providers: [AdsServiceService, AdsRepo, PGDatabaseService],
  // exports: [AdsServiceService]
})
export class AdsModuleModule {}
