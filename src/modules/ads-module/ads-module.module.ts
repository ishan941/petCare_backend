import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdsServiceService } from './service/ads-service.service';
import { AdsRepo } from './Repo/ads.repo';
import { ConfigModule } from '@nestjs/config';
import { PGDatabaseService } from 'src/core /Database/pg.database.service';

@Module({
  // imports: [],
  controllers: [AdsController],
  providers: [AdsServiceService, AdsRepo, PGDatabaseService],
  // exports: [AdsServiceService]
})
export class AdsModuleModule {}
