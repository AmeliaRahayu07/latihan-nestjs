import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NilaiService {
  private cekNilai(nilai: any, label: string) {
    if (typeof nilai !== 'number' || !Number.isFinite(nilai)) {
      throw new BadRequestException(`${label} harus berupa angka`);
    }
    if (nilai < 0 || nilai > 100) {
      throw new BadRequestException(`${label} harus antara 0 sampai 100`);
    }
  }

  hitung(body: any) {
    const { nama, tugas, uts, uas } = body ?? {};

    if (typeof nama !== 'string' || nama.trim() === '') {
      throw new BadRequestException('Nama harus string dan tidak boleh kosong');
    }
    if (!Array.isArray(tugas) || tugas.length < 1) {
      throw new BadRequestException('Tugas harus array berisi minimal 1 angka');
    }
    for (let i = 0; i < tugas.length; i++) {
      this.cekNilai(tugas[i], `Nilai tugas ke-${i + 1}`);
    }
    this.cekNilai(uts, 'UTS');
    this.cekNilai(uas, 'UAS');

    const jumlahTugas = tugas.reduce((total: number, n: number) => total + n, 0);
    const rataTugas = jumlahTugas / tugas.length;
    const nilaiAkhir = 0.3 * rataTugas + 0.3 * uts + 0.4 * uas;

    let predikat: string;
    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';
    else predikat = 'D';

    return {
      nama: nama.trim(),
      rataTugas: Math.round(rataTugas * 100) / 100,
      nilaiAkhir: Math.round(nilaiAkhir * 100) / 100,
      predikat,
      status: nilaiAkhir >= 75 ? 'Lulus' : 'Remedial',
    };
  }
}