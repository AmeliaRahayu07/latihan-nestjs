import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './deret.service.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  buat(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah?: string,
    @Query('urutan') urutan?: string,
  ) {
    return this.deretService.buat(jenis, jumlah, urutan);
  }
}