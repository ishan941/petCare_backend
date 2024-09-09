import { Module } from '@nestjs/common';
import { CategoriesService } from './service/categories.service';
import { CategoriesRepo } from './Repo/categories.repo';
import { PGDatabaseService } from 'src/core /Database/pg.database.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesController } from './categories_controller/categories.controller';

@Module({
    imports: [
  
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'), // Path to your uploaded files
            serveRoot: '/uploads', // URL path to access the files
          }),

    ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepo, PGDatabaseService]
})
export class CategoriesModule {}
