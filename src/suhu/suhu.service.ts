import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SuhuService {
  private readonly satuan = ['celsius', 'fahrenheit', 'kelvin'];

  konversi(nilaiStr?: string, dari?: string, ke?: string) {
    if (nilaiStr === undefined || nilaiStr.trim() === '') {
      throw new BadRequestException('Query nilai wajib diisi');
    }
    if (dari === undefined || dari.trim() === '') {
      throw new BadRequestException('Query dari wajib diisi');
    }
    if (ke === undefined || ke.trim() === '') {
      throw new BadRequestException('Query ke wajib diisi');
    }

    const nilai = Number(nilaiStr);
    if (!Number.isFinite(nilai)) {
      throw new BadRequestException('Nilai harus berupa angka');
    }

    if (!this.satuan.includes(dari)) {
      throw new BadRequestException(
        'Satuan asal harus celsius, fahrenheit, atau kelvin',
      );
    }
    if (!this.satuan.includes(ke)) {
      throw new BadRequestException(
        'Satuan tujuan harus celsius, fahrenheit, atau kelvin',
      );
    }
    if (dari === ke) {
      throw new BadRequestException('Satuan asal dan tujuan tidak boleh sama');
    }
    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('Nilai kelvin tidak boleh kurang dari 0');
    }

    let celsius: number;
    if (dari === 'celsius') celsius = nilai;
    else if (dari === 'fahrenheit') celsius = ((nilai - 32) * 5) / 9;
    else celsius = nilai - 273.15;

    let hasil: number;
    if (ke === 'celsius') hasil = celsius;
    else if (ke === 'fahrenheit') hasil = (celsius * 9) / 5 + 32;
    else hasil = celsius + 273.15;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: Math.round(hasil * 100) / 100,
      satuanHasil: ke,
    };
  }
}