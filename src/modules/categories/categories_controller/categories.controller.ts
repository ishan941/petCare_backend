import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../service/categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesDto } from '../Dto/categories.dto';
import * as path from 'path';  // Correctly import the path module

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    // @Post('/upload-image')
    // @ApiConsumes('multipart/form-data')  // Correct the typo here ('multipart/form-data')
    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             image: {
    //                 type: 'string',
    //                 format: 'binary',  // Correctly mark it as a binary file
    //             },
    //             categoriesImage: {
    //                 type: 'string',
    //                 description: 'Optional image path for categories',
    //             },
    //             categoriesName: {
    //                 type: 'string',
    //                 description: 'Category name',
    //             },
    //         },
    //     },
    // })
    // @UseInterceptors(FileInterceptor('image', {
    //     dest: '/Users/ishanshrestha/nestjs/image_petCare/categories_image',
    //     limits: {
    //         fileSize: 10 * 1024 * 1024, // 10MB limit
    //     },
    //     fileFilter: (req, file, callback) => {
    //         if (!file.mimetype.startsWith('image/')) {
    //             return callback(new BadRequestException('Invalid file type'), false);
    //         }
    //         callback(null, true);
    //     },
    // }))
    // async uploadSinglePhoto(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() dto: CategoriesDto
    // ) {
    //     console.log('Received file:', file);
    //     console.log('Received DTO:', dto);

    //     if (!file) {
    //         throw new BadRequestException('File not uploaded');
    //     }
    //     const filePath = path.join('/Users/ishanshrestha/nestjs/image_petCare/categories_image', file.filename); // Match the destination path
    //     console.log('File path:', filePath);
    //     return this.categoriesService.createCategories({ ...dto, categoriesImage: filePath });
    // }
    @Post('/upload-image')
    async uploadPic(@Body() dto:CategoriesDto){
        return await this.categoriesService.createCategories(dto);
    }

    @Get('getCategories')
    findAll() {
        return this.categoriesService.getAllCategories();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.getCategoriesById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() categoriesDto: CategoriesDto) {
        return this.categoriesService.updateCategory(id, categoriesDto);
    }

    @Delete('deleteById/:id')
    remove(@Param('id') id: number){
        return this.categoriesService.deleteCategory(id);
    }
}
