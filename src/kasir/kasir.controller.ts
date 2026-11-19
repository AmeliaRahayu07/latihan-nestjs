import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { KasirService } from './kasir.service.js';

@Controller('kasir')
export class KasirController {
  constructor(private readonly kasirService: KasirService) {}

  @Post('checkout/:member')
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string | undefined,
    @Body() body: any,
  ) {
    return this.kasirService.checkout(member, metode, body);
  }
}