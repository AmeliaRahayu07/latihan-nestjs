import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class KasirService {
  private readonly diskonMember: Record<string, number> = {
    reguler: 0,
    silver: 5,
    gold: 10,
  };

  private validasiItems(items: any) {
    if (!Array.isArray(items)) {
      throw new BadRequestException('Items harus berupa array');
    }
    if (items.length === 0) {
      throw new BadRequestException('Items tidak boleh kosong');
    }
    if (items.length > 10) {
      throw new BadRequestException('Items maksimal 10 item');
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const no = i + 1;

      if (item === null || typeof item !== 'object' || Array.isArray(item)) {
        throw new BadRequestException(`Item ke-${no}: harus berupa objek`);
      }
      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(
          `Item ke-${no}: nama harus string tidak kosong`,
        );
      }
      if (
        typeof item.harga !== 'number' ||
        !Number.isFinite(item.harga) ||
        item.harga <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${no}: harga harus angka lebih dari 0`,
        );
      }
      if (
        typeof item.qty !== 'number' ||
        !Number.isInteger(item.qty) ||
        item.qty <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${no}: qty harus bilangan bulat lebih dari 0`,
        );
      }
    }
  }

  private hitungTotal(items: any[], member: string, metode: string) {
    const rincian = items.map((item) => ({
      nama: item.nama,
      harga: item.harga,
      qty: item.qty,
      subtotal: item.harga * item.qty,
    }));

    let totalItem = 0;
    let subtotal = 0;
    for (const r of rincian) {
      totalItem += r.qty;
      subtotal += r.subtotal;
    }

    const diskon = (subtotal * this.diskonMember[member]) / 100;
    const biayaAdmin = metode === 'qris' ? ((subtotal - diskon) * 1) / 100 : 0;
    const total = subtotal - diskon + biayaAdmin;
    const bulat = (n: number) => Math.round(n * 100) / 100;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal: bulat(subtotal),
      diskon: bulat(diskon),
      biayaAdmin: bulat(biayaAdmin),
      total: bulat(total),
    };
  }

  checkout(memberParam: string, metode: string | undefined, body: any) {
    const member = (memberParam ?? '').toLowerCase();
    if (!['reguler', 'silver', 'gold'].includes(member)) {
      throw new BadRequestException('Member harus reguler, silver, atau gold');
    }

    if (metode === undefined || metode.trim() === '') {
      throw new BadRequestException('Query metode wajib diisi');
    }
    if (!['tunai', 'qris'].includes(metode)) {
      throw new BadRequestException('Metode harus tunai atau qris');
    }

    const items = body?.items;
    this.validasiItems(items);

    return this.hitungTotal(items, member, metode);
  }
}