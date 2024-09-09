import { Injectable } from "@nestjs/common";
import { Category, SignUp } from "@prisma/client";
import { BaseRepository } from "src/core/Database/interface/baseRepository";
import { PGDatabaseService } from "src/core/Database/pg.database.service";


@Injectable()
export class CategoriesRepo extends BaseRepository<Category> {



    constructor(private pgDatabaseService: PGDatabaseService) {
        super(pgDatabaseService.prismaRead.signUp)
    }
    //deleteBYID
    async deleteById(id: number): Promise<boolean> {
        try {
            await this.pgDatabaseService.prismaWrite.ads.delete({
                where: { id },
            });
            return true;

        } catch (e) {
            console.error('Error deleting user:', e);
            return false;
        }
    }

    //Post 
    async create(item: Partial<Category>): Promise<Category> {
        return await this.pgDatabaseService.prismaWrite.category.create({
            data: {
                categoriesImage: item.categoriesImage,
                categoriesName: item.categoriesName
            }
        })

    }
    //get
    async findUnique(id: number): Promise<Category | null> {
        return await this.pgDatabaseService.prismaRead.category.findUnique({
            where: { id: id },
        });
    }
    //find by email
    async findUniqueByEmail(id: number): Promise<Category | null> {
        return await this.pgDatabaseService.prismaRead.category.findUnique({
            where: { id: id },
            //
        });
    }
    //Update
    updateById(id: number, item: { id: number; categoriesImage: string | null; categoriesName: string | null; }) {
        return this.pgDatabaseService.prismaWrite.category.update({
            where: { id: id },
            data: {
                categoriesImage: item.categoriesImage,
                categoriesName: item.categoriesName
            }
        });
    }

    //not used
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async find(): Promise<Category[]> {
        return await this.pgDatabaseService.prismaWrite.category.findMany()
    }
    findOne(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: { id: number; categoriesImage: string | null; categoriesName: string | null; }): Promise<{ id: number; categoriesImage: string | null; categoriesName: string | null; }> {
        throw new Error("Method not implemented.");
    }



}