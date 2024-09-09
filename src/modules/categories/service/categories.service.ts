import { Injectable } from '@nestjs/common';
import { CategoriesRepo } from '../Repo/categories.repo';
import { Category } from '@prisma/client';
import { CategoriesDto } from '../Dto/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepo: CategoriesRepo) { }
    async createCategories(categoriesDto: CategoriesDto): Promise<any> {
        const newCategory = {
            ...categoriesDto,
            categoriesImage: categoriesDto.categoriesImage,
            categoriesName: categoriesDto.categoriesName
        }
        return this.categoriesRepo.create(newCategory);
    }
    async getAllCategories(): Promise<Category[]> {
        return this.categoriesRepo.find();
    }
    async getCategoriesById(id: string): Promise<Category | null> {
        return this.categoriesRepo.findOne(id);
    }
    async updateCategory(id: number, categoriesDto: CategoriesDto): Promise<Category> {
        const updateCategory: Category = {
            id: categoriesDto.id,
            categoriesImage: categoriesDto.categoriesImage,
            categoriesName: categoriesDto.categoriesName
        }
        return this.categoriesRepo.updateById(id, updateCategory);
    }
    async deleteCategory(id: number): Promise<boolean>{
        return this.categoriesRepo.deleteById(id);
    }
}
