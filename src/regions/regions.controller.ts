import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imagesUploadOptions } from 'src/config/multer.config';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', imagesUploadOptions))
  create(@Body() createRegionDto: CreateRegionDto, @UploadedFile() file: any) {
    return this.regionsService.create(createRegionDto, file);
  }

  @Get('/sum-subscribers')
  sumOfSubscribersByRegion() {
    return this.regionsService.sumOfSubscribersByRegion();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
