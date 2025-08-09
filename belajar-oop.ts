class Hewan {
  nama: string;
  jumlahKaki: number;

  /**
   *
   */
  constructor(nama: string, jumlahKaki: number) {
    this.nama = nama;
    this.jumlahKaki = jumlahKaki;
  }

  suara() {
    console.log(`${this.nama} bersuara`);
  }
}

const kucing = new Hewan('Kucing', 4);
kucing.suara();
