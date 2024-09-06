import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/core /App/app.controller';
import { AppService } from 'src/core /App/app.service';
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './Prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({

    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        PrismaModule,
        JwtModule

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class ModulesModule {

}
