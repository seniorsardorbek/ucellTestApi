import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

const data = [
  ['Sirdarya', '175', 2, 125000],
  ['Samarkand', '175', 5, 125000],
  ['Tashkent', '200', 7, 1290],
  ['BUKHARA', '200', 11, 4990],
  ['KHOREZM', '175', 14, 1290],
  ['TASHKENT', '175', 27, 19990],
  ['TASHKENT', '200', 28, 8990],
  ['DJIZZAK', '200', 28, 4990],
  ['BUKHARA', '200', 36, 4990],
  ['BUKHARA', '200', 42, 23950],
  ['KHOREZM', '170', 46, 8990],
  ['BUKHARA', '170', 50, 19990],
  ['SIRDARYA', '170', 50, 4990],
  ['KHOREZM', '170', 53, 1290],
  ['KARAKALPAKISTAN', '170', 55, 12490],
  ['SAMARKAND', '170', 66, 1990],
  ['SAMARKAND', '200', 67, 1290],
  ['SAMARKAND', '200', 75, 1990],
  ['BUKHARA', '170', 80, 8990],
  ['SAMARKAND', '170', 87, 15000],
  ['BUKHARA', '170', 90, 4990],
  ['SAMARKAND', '170', 90, 4990],
  ['SAMARKAND', '170', 94, 19990],
  ['SAMARKAND', '200', 96, 4990],
  ['TASHKENT', '200', 4, 4990],
  ['SURKHANDARYA', '135', 15, 19990],
  ['SAMARKAND', '135', 16, 15990],
  ['SIRDARYA', '200', 29, 1990],
  ['TASHKENT', '200', 35, 4990],
  ['DJIZZAK', '170', 60, 4990],
  ['DJIZZAK', '170', 60, 8990],
  ['KHOREZM', '200', 62, 4990],
  ['KHOREZM', '200', 64, 8990],
  ['KHOREZM', '200', 74, 15990],
  ['KARAKALPAKISTAN', '170', 81, 19990],
  ['KHOREZM', '170', 95, 1990],
  ['KHOREZM', '170', 96, 4990],
  ['DJIZZAK', '170', 3, 275000],
  ['KARAKALPAKISTAN', '175', 7, 19990],
  ['DJIZZAK', '175', 32, 1990],
  ['TASHKENT', '175', 56, 2990],
  ['KHOREZM', '175', 57, 19990],
  ['SAMARKAND', '200', 76, 1990],
];
@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}
  async create(createRegionDto: CreateRegionDto, file: any) {
    const regions = data.map((item) => ({
      title: item[0] as string,
      item: parseFloat(item[1] as string),
      units: item[2] as number,
      subribers: item[3] as number,
    }));

    await this.regionRepository.save(regions);

    return { message: 'Regions saved successfully', count: regions.length };
  }

  async sumOfSubscribersByRegion() {
    console.log('here');
    const regiosn = await this.regionRepository
      .createQueryBuilder('region')
      .select('region.title', 'title')
      .addSelect('SUM(region.subribers)', 'totalSubscribers')
      .groupBy('region.title')
      .getRawMany();
    return regiosn;
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
