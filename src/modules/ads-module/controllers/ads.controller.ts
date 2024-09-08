import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put ,UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdsDto } from '../Dto/ads.dto';

import { AdsServiceService } from '../service/ads-service.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import path from 'path';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsServiceService) {}

  @Post('addAds')
  @UseInterceptors(FileInterceptor('image', {
    dest: '/home/shakti/Pictures', // Ensure this path is correct
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.startsWith('image/')) {
        return callback(new BadRequestException('Invalid file type'), false);
      }
      callback(null, true);
    },
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() adsDto: AdsDto) {
    console.log('Received file:', file); // Should log file object or undefined
    console.log('Ads DTO:', adsDto); // Should log the Ads DTO

    if (!file) {
      throw new BadRequestException('File not uploaded');
    }

    const filePath = path.join('/uploads', file.filename); // Path to the uploaded image
    console.log('File path:', filePath);

    // Call the service to create an ad
    return this.adsService.createAds(adsDto, filePath);
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
