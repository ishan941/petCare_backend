import { Injectable } from "@nestjs/common";
import { SignUp } from "@prisma/client";
import { emitWarning } from "process";
import { BaseRepository } from "src/core /Database/interface/baserepository";
import { PGDatabaseService } from "src/core /Database/pg.database.service";

@Injectable()
export class AuthRepo extends BaseRepository<SignUp> {
  deleteById(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  constructor(private pgDatabaseServise: PGDatabaseService) {
    super(pgDatabaseServise.prismaRead.signUp);
  }
  async create(item: SignUp): Promise<SignUp> {
    return await this.pgDatabaseServise.prismaWrite.signUp.create({
      data: item,
    });
  }
  async find(): Promise<SignUp[]> {
    return await this.pgDatabaseServise.prismaWrite.signUp.findMany();
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.pgDatabaseServise.prismaWrite.signUp.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
  async findOne(id: string): Promise<SignUp | null> {
    return await this.pgDatabaseServise.prismaWrite.signUp.findUnique({
      where: { id },
    });
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
  async update(id: string, item: SignUp): Promise<SignUp> {
    return await this.pgDatabaseServise.prismaWrite.signUp.update({
      where: { id: id },
      data: item,
    });
  }
}