import { Controller, Get, Param } from '@nestjs/common';
import { BilanganService } from './bilangan.service.js';

@Controller('bilangan')
export class BilanganController {
  constructor(private readonly bilanganService: BilanganService) {}

  @Get(':angka')
  cek(@Param('angka') angka: string) {
    return this.bilanganService.cek(angka);
  }
}