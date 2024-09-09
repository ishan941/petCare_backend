import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put ,UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdsDto } from '../Dto/ads.dto';

import { AdsServiceService } from '../service/ads-service.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import * as path from 'path';  // Correctly import the path module



@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsServiceService) {}
  // @Post('/upload-photo')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary', // This tells Swagger to expect a file upload
  //       },
  //       adsImage: {
  //         type: 'string',
  //         description: 'Optional image path for the ad',
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FileInterceptor('image', {
  //   dest: '/home/shakti/Pictures', // Ensure this path exists and is writable
  //   limits: {
  //     fileSize: 10 * 1024 * 1024, // 10MB limit
  //   },
  //   fileFilter: (req, file, callback) => {
  //     if (!file.mimetype.startsWith('image/')) {
  //       return callback(new BadRequestException('Invalid file type'), false);
  //     }
  //     callback(null, true);
  //   },
  // }))
  // async uploadSinglePhoto(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() dto: AdsDto
  // ) {
  //   console.log('Received file:', file); // Logs file object or undefined
  //   console.log('Received DTO:', dto); // Logs the AdsDto object
  
  //   if (!file) {
  //     throw new BadRequestException('File not uploaded');
  //   }
  
  //   const filePath = path.join('/home/shakti/Pictures', file.filename); // Match the destination path
  //   console.log('File path:', filePath);
  
  //   // Create a new ad with the provided image path and other DTO data
  //   await this.adsService.createAds({ ...dto, adsImage: filePath });
  
  //   // Return a success message instead of the file or saved data
  //   return { message: 'Ad created successfully' };
  // }
  
  @Post('/upload-photo')
  async uploadPic(@Body() dto:AdsDto){
    return await this.adsService.createAds(dto);
  }

  @Get('getAds')
  findAll() {
    return this.adsService.getAllAds();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.getAdsById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() adsDto: AdsDto) {
    return this.adsService.updateAds(id, adsDto);
  }

  @Delete('deleteById/:id')
  remove(@Param('id') id: number) {
    return this.adsService.deleteAds(id);
  }
}
