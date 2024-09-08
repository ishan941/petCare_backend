import { Injectable } from '@nestjs/common';
import { AdsRepo } from '../Repo/ads.repo';
import { AdsDto } from '../Dto/ads.dto';
import { Ads } from '@prisma/client';

@Injectable()
export class AdsServiceService {
    constructor(private readonly adsRepo: AdsRepo) { }

    async createAds(adsDto: AdsDto): Promise<Ads> {
        const newAd: Ads = {
            adsImage: adsDto.adsImage,
            id: undefined
        };
        return this.adsRepo.create(newAd);
    }

    async getAllAds(): Promise<Ads[]> {
        return this.adsRepo.find();
    }

    async getAdsById(id: string): Promise<Ads | null> {
        return this.adsRepo.findOne(id);
    }

    async updateAds(id: string, adsDto: AdsDto): Promise<Ads> {
        const updatedAd: Ads = {
            id: adsDto.id,
            adsImage: adsDto.adsImage,
        };
        return this.adsRepo.update(id, updatedAd);
    }

    async deleteAds(id: number): Promise<boolean> {
        return this.adsRepo.deleteById(id);
    }
}
