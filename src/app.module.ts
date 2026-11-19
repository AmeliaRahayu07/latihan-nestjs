import { Module } from '@nestjs/common';
import { BilanganController } from './bilangan/bilangan.controller.js';
import { SuhuController } from './suhu/suhu.controller.js';
import { DeretController } from './deret/deret.controller.js';
import { NilaiController } from './nilai/nilai.controller.js';
import { KasirController } from './kasir/kasir.controller.js';
import { BilanganService } from './bilangan/bilangan.service.js';
import { SuhuService } from './suhu/suhu.service.js';
import { DeretService } from './deret/deret.service.js';
import { NilaiService } from './nilai/nilai.service.js';
import { KasirService } from './kasir/kasir.service.js';

@Module({
  controllers: [
    BilanganController,
    SuhuController,
    DeretController,
    NilaiController,
    KasirController,
  ],
  providers: [
    BilanganService,
    SuhuService,
    DeretService,
    NilaiService,
    KasirService,
  ],
})
export class AppModule {}