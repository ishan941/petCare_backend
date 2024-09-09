import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './Prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdsModuleModule } from './ads-module/ads-module.module';
import { AppController } from '../core/App/app.controller';
import { AppService } from '../core/App/app.service';

@Module({

    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        PrismaModule,
        JwtModule,
        AdsModuleModule

    ],
    controllers: [AppController],
    providers: [AppService,],
})
export class ModulesModule {

}
