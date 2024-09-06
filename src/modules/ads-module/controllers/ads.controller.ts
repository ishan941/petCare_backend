import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdsDto } from '../Dto/ads.dto';
import { AdsServiceService } from '../service/ads-service.service';


@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsServiceService) {}

  @Post('addAds')
  create(@Body() adsDto: AdsDto) {
    return this.adsService.createAds(adsDto);
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
