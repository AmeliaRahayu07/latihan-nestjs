import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DeretService {
  buat(jenis: string, jumlahStr?: string, urutan?: string) {
    if (!['ganjil', 'genap', 'kuadrat'].includes(jenis)) {
      throw new BadRequestException('Jenis harus ganjil, genap, atau kuadrat');
    }

    if (jumlahStr === undefined || jumlahStr.trim() === '') {
      throw new BadRequestException('Query jumlah wajib diisi');
    }
    const jumlah = Number(jumlahStr);
    if (Number.isNaN(jumlah)) {
      throw new BadRequestException('Jumlah harus berupa angka');
    }
    if (!Number.isInteger(jumlah)) {
      throw new BadRequestException('Jumlah harus bilangan bulat');
    }
    if (jumlah < 1 || jumlah > 20) {
      throw new BadRequestException('Jumlah harus antara 1 sampai 20');
    }

    if (urutan !== undefined && !['asc', 'desc'].includes(urutan)) {
      throw new BadRequestException('Urutan harus asc atau desc');
    }

    const data: number[] = [];
    let total = 0;
    for (let i = 1; i <= jumlah; i++) {
      let nilai: number;
      if (jenis === 'ganjil') nilai = 2 * i - 1;
      else if (jenis === 'genap') nilai = 2 * i;
      else nilai = i * i;

      data.push(nilai);
      total += nilai;
    }

    if (urutan === 'desc') data.reverse();

    return { jenis, jumlah, data, total };
  }
}