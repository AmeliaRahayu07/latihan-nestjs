import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class BilanganService {
  cek(angkaStr: string) {
    if (angkaStr === undefined || angkaStr.trim() === '') {
      throw new BadRequestException('Angka wajib diisi');
    }
    const angka = Number(angkaStr);
    if (Number.isNaN(angka)) {
      throw new BadRequestException('Angka harus berupa bilangan');
    }
    if (!Number.isInteger(angka)) {
      throw new BadRequestException('Angka harus bilangan bulat');
    }
    if (angka < 1 || angka > 100) {
      throw new BadRequestException('Angka harus antara 1 sampai 100');
    }

    return {
      angka,
      jenis: angka % 2 === 0 ? 'genap' : 'ganjil',
      kuadrat: angka * angka,
      kelipatanLima: angka % 5 === 0,
    };
  }
}