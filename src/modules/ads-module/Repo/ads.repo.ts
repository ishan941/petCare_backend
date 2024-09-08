import { Injectable } from "@nestjs/common";
import { Ads, SignUp } from "@prisma/client";
import { emitWarning } from "process";
import { BaseRepository } from "src/core /Database/interface/baserepository";
import { PGDatabaseService } from "src/core /Database/pg.database.service";

@Injectable()
export class AdsRepo extends BaseRepository<Ads> {

    constructor(private pgDatabaseServise: PGDatabaseService) {
        super(pgDatabaseServise.prismaRead.signUp);
    }

    update(id: string, item: { id: number; adsImage: string | null; }): Promise<{ id: number; adsImage: string | null; }> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<{ id: number; adsImage: string | null; }> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: number): Promise<boolean> {
        try {
            await this.pgDatabaseServise.prismaWrite.ads.delete({
                where: { id },
            });
            return true;

        } catch (e) {
            console.error('Error deleting user:', e);
            return false;
        }

    }

    async create(item: Ads): Promise<Ads> {
        return await this.pgDatabaseServise.prismaWrite.ads.create({
            data: {
                adsImage: item.adsImage,
            },
        });
    }

    async find(): Promise<Ads[]> {
        return await this.pgDatabaseServise.prismaWrite.ads.findMany();
    }


    async delete(id: any): Promise<boolean> {
        try {
            await this.pgDatabaseServise.prismaWrite.ads.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }


    async findUnique(email: string): Promise<SignUp | null> {
        return await this.pgDatabaseServise.prismaRead.signUp.findUnique({
            where: { email: email },
        });
    }


    async findUniqueBypassword(email: string): Promise<SignUp | null> {
        return await this.pgDatabaseServise.prismaRead.signUp.findUnique({
            where: { email: email },
            //
        });
    }

}