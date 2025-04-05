<template>
    <!-- Filter -->
    <div class="pb-10">
        <div class="font-Roboto tracking-wider ">
            <div class="bg-white -mx-10 flex items-center justify-between px-20 py-4">
                <div>
                    <div class="flex space-x-3 py-4 relative -left-6">
                        <div>
                            <div>
                                <!-- <div @click="dropdownKodeObat"
                                    class="bg-white border border-black rounded-lg cursor-pointer w-52">
                                    <div class="flex justify-between items-center px-4">
                                        <button class="px-2 py-2">
                                            <h1>Jumlah Stok</h1>
                                        </button>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div v-if="isKodeObatOpen"
                                    class="absolute bg-white border border-black mt-2 rounded-lg shadow-lg w-52">
                                    <div class="flex flex-col divide-y divide-gray-200">
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>ADM</h1>
                                        </label>
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>ACU</h1>
                                        </label>
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>ATU</h1>
                                        </label>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div>
                            <div>
                                <!-- <div class="relative">  
                                    <div @click="dropdownJenisObat"
                                        class="bg-white border border-black rounded-lg cursor-pointer w-52">
                                        <div class="flex justify-between items-center px-4">
                                            <button class="px-2 py-2">
                                                <h1>Tipe Transaksi</h1>
                                            </button>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isJenisObatOpen"
                                        class="absolute bg-white border border-black mt-2 rounded-lg shadow-lg w-52">
                                        <div class="flex flex-col divide-y divide-gray-200">
                                            <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                                <input type="checkbox">
                                                <h1>Tablet</h1>
                                            </label>
                                            <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                                <input type="checkbox">
                                                <h1>Tablet - Generik</h1>
                                            </label>
                                            <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                                <input type="checkbox">
                                                <h1>Sirup</h1>
                                            </label>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div>
                            <!-- <div class="bg-red-600 hover:bg-emerald-700 border border-black rounded-lg">
                                <button class="px-6 py-2 font-bold text-white">
                                    <h1>Filter</h1>
                                </button>
                            </div> -->
                        </div>
                    </div>
                </div>


                <div class="flex justify-end space-x-6">
                    <div>
                        <input @input="SearchData" v-model="searchInput"
                            class="bg-gray-100 border-2 border-black pl-4 w-[30rem] h-[2.8rem] capitalize rounded-lg"
                            type="text" placeholder="Cari Obat...">
                    </div>
                    <div class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
                        <button class="px-6 py-2 font-bold text-white">
                            <h1>Cari</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="font-Roboto px-4 py-6">
        <!-- GRID OBAT -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <div v-for="obat in dataObat.filter((obats) => obats.stok.length > 0)" :key="obat.id_obat"
                class="bg-emerald-600 text-white rounded-2xl border border-black p-4 flex flex-col shadow-md hover:shadow-lg transition">
                <!-- Gambar -->
                <div class="border border-black rounded-xl bg-gray-100 p-1 mb-3">
                    <img :src="getFullImgPath(obat.gambar_obat)" class="w-full h-28 object-cover rounded-md mx-auto"
                        ref="imageRefs" @load="checkImageSize($event, obat.nama_obat)" />
                </div>

                <!-- Counter -->
                <div class="flex justify-center mb-3">
                    <div
                        class="flex items-center space-x-2 px-3 py-1 bg-white text-black rounded-lg border border-black">
                        <button @click="minus(obat)" class="text-lg font-bold hover:text-red-600">–</button>
                        <input type="number"
                            class="w-10 text-center text-base font-semibold bg-transparent focus:outline-none"
                            v-model="obat.jumlah_checkout" @change="InputCheckout(obat)" />
                        <button @click="plus(obat)" class="text-lg font-bold hover:text-green-600">+</button>
                    </div>
                </div>

                <!-- Detail Obat -->
                <div class="mb-3 space-y-1.5">
                    <div class="space-y-1">
                        <h1 class="text-base font-bold leading-snug truncate">{{ obat.nama_obat }}</h1>
                        <div class="flex justify-between text-xs text-white/90">
                            <span class="font-semibold">{{ formattedRupiah(obat.harga_jual) }}</span>
                            <span class="italic text-white/70">{{ obat.dosis_obat }}</span>
                        </div>
                    </div>
                    <div
                        class="flex justify-between items-center text-sm bg-white text-black px-3 py-1 rounded-lg mt-2 border border-black">
                        <span class="font-semibold">Stok</span>
                        <span :class="[
                            'font-bold',
                            obat.stok[obat.stok.length - 1].stok_akhir > 0 ? 'text-green-600' : 'text-red-600'
                        ]">
                            {{
                                obat.stok[obat.stok.length - 1].stok_akhir > 0
                                    ? obat.stok[obat.stok.length - 1].stok_akhir
                            : 'Habis'
                            }}
                        </span>
                    </div>
                </div>

                <!-- Toggle Detail -->
                <button @click="obat.showMore = !obat.showMore"
                    class="text-xs underline text-white hover:text-gray-200 mt-1 self-start">
                    {{ obat.showMore ? 'Lebih sedikit' : 'Selengkapnya' }}
                </button>

                <div v-show="obat.showMore"
                    class="text-sm mt-3 space-y-2 border-t border-white pt-2 transition-all duration-300">
                    <div>
                        <p class="font-semibold text-sm">{{ obat.merk_obat }}</p>
                        <p class="text-xs">{{ obat.deskripsi }}</p>
                    </div>
                    <div class="space-y-1">
                        <div>
                            <h1 class="font-semibold text-xs">Tag:</h1>
                            <div class="flex flex-wrap gap-1">
                                <div v-for="tag in obat.tags" :key="tag.id_tag_obat"
                                    class="bg-white text-black border border-black px-2 py-0.5 rounded text-[10px]">
                                    {{ tag.nama_tag }}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 class="font-semibold text-xs">Tipe Obat:</h1>
                            <div
                                class="bg-white text-black border border-black px-2 py-0.5 rounded-full text-xs inline-block">
                                {{ obat.tipe_obat.nama_tipe }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL CHECKOUT -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-[60rem] max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between mb-4">
                    <h2 class="text-lg font-semibold text-black">Detail Transaksi</h2>
                    <button @click="closeModal">❌</button>
                </div>

                <div class="divide-y divide-gray-300 space-y-4">
                    <div v-for="(listCheckout, index) in SelectedObat" :key="listCheckout.id_obat" class="space-y-2">
                        <h3 class="text-black font-bold">Checkout {{ index + 1 }}</h3>
                        <p><strong>Nama:</strong> {{ listCheckout.nama_obat }}</p>
                        <p><strong>Dosis:</strong> {{ listCheckout.dosis_obat }}</p>
                        <p><strong>Jumlah:</strong> {{ listCheckout.jumlah_checkout }}</p>
                        <p><strong>Total Harga:</strong> {{ formattedRupiah(listCheckout.jumlah_checkout *
                            listCheckout.harga_jual) }}</p>
                    </div>

                    <div class="text-black pt-4">
                        <label>Diskon (%)</label>
                        <input type="number" class="border p-1 ml-2" v-model="diskonPersen" />
                        <p>Total Harga: {{ formattedRupiah(hargaTotals) }}</p>
                        <p>Diskon: {{ formattedRupiah(diskonJumlah) }}</p>
                        <p>Setelah Diskon: {{ formattedRupiah(hargaSetelahDiskon) }}</p>
                    </div>
                </div>

                <div class="flex justify-center mt-6">
                    <button @click="postTransaksi"
                        class="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-700">
                        Buat Transaksi
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <!-- Floating Checkout Button -->
        <div class="fixed bottom-6 right-6 z-50">
            <button @click="showDetail(obatCheckout)"
                class="flex flex-col items-center justify-center gap-2 bg-white hover:bg-emerald-700 hover:text-white text-center font-bold px-6 py-4 rounded-xl shadow-lg border border-black transition duration-300 ease-in-out">
                <!-- Icon Keranjang -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="#8c8200" viewBox="0 0 24 24" stroke-width="1.0"
                    stroke="#8c8200" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>

                <!-- Nama Pelanggan (jika ada) -->
                <div v-if="selectedPelanggan !== null" class="text-xs font-medium text-gray-800 dark:text-white">
                    <span>Pelanggan:</span> <span class="capitalize">{{ selectedPelanggan.nama }}</span>
                </div>

                <!-- Teks Checkout -->
                <h1 class="text-base">Checkout</h1>
            </button>
        </div>

    </div>

    <div v-if="showModalPelanggan"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">

            <button @click="closeModal"
                class="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all duration-200 text-lg">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h2 class="text-lg font-bold mb-4 text-center">Pilih Opsi</h2>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
                <button @click="modalType = 'tambah', showModals = true"
                    class="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200 w-52 text-center flex items-center justify-center gap-2">
                    <i class="fa-solid fa-user-plus"></i>
                    Pelanggan Baru
                </button>
                <button @click="modalType = 'pilih', showModals = true"
                    class="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all duration-200 w-52 text-center flex items-center justify-center gap-2">
                    <i class="fa-solid fa-users"></i>
                    Pelanggan Lama
                </button>
            </div>
            <div v-if="modalType === 'tambah' && showModals" class="mt-4">
                <h3 class="text-md font-semibold mb-2">Tambah Pelanggan</h3>
                <label>Nama :</label>
                <input v-model="formPelanggan.nama" type="text" placeholder="Nama"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label>Email :</label>
                <input v-model="formPelanggan.email" type="email" placeholder="Email"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label>No Telpon :</label>
                <input v-model="formPelanggan.telepon" type="tel" placeholder="No Telpon"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label>Alamat :</label>
                <input v-model="formPelanggan.alamat" type="text" placeholder="Alamat"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <button @click="tambahPelanggan" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Simpan
                </button>
            </div>
            <div v-if="modalType === 'pilih' && showModals" class="mt-4">
                <h3 class="text-md font-semibold mb-2">Pilih Pelanggan</h3>
                <div class="max-h-60 overflow-y-auto border rounded-lg">
                    <table class="w-full border-collapse">
                        <thead class="bg-gray-200">
                            <tr>
                                <th class="px-4 py-2 border">Nama</th>
                                <th class="px-4 py-2 border">Alamat</th>
                                <th class="px-4 py-2 border">Telepon</th>
                                <th class="px-4 py-2 border">Email</th>
                                <th class="px-4 py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pelanggan in pelangganList" :key="pelanggan.id" class="hover:bg-gray-100">
                                <td class="px-4 py-2 border">{{ pelanggan.nama }}</td>
                                <td class="px-4 py-2 border">{{ pelanggan.alamat }}</td>
                                <td class="px-4 py-2 border">{{ pelanggan.telepon }}</td>
                                <td class="px-4 py-2 border">{{ pelanggan.email }}</td>
                                <td class="px-4 py-2 border">
                                    <button @click="pilihPelanggan(pelanggan)"
                                        class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                        Pilih
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
import Api from '@/services/Api';

export default {
    computed: {
        hargaTotals() {
            return this.obatCheckout.reduce((total, obat) => {
                return total + (obat.jumlah_checkout * obat.harga_jual);
            }, 0);
        },
        // Menghitung diskon (misalnya 10%)
        diskonJumlah() {
            return this.hargaTotals * (this.diskonPersen / 100) // Diskon 10%
        },
        // Menghitung harga setelah diskon
        hargaSetelahDiskon() {
            return this.hargaTotals - this.diskonJumlah;
        }
    },
    data() {
        return {
            modalType: 'pilih',
            diskonPersen: 0,
            jumlah_checkout: 0,
            showModal: false,
            showModalPelanggan: true,
            showModals: false,
            pelangganList: [],
            selectedPelanggan: null,
            id_user: null,
            SelectedObat: {},
            dataObat: [],
            searchInput: '',
            obatCheckout: [],
            formPelanggan: {
                nama: '',
                alamat: '',
                telepon: '',
                email: ''
            },
            transaksi: {
                kode_transaksi: '',
                id_pelanggan: null,
                status: 'PENDING',
                metode_bayar: 'CASH',
                diskon: 0,
                obats: [],
                handled_by: null
            }
        }
    },
    mounted() {
        this.getObats()
        this.fetchPelanggan()
        this.id_user = parseInt(localStorage.getItem('user'))
    },
    methods: {
        pilihPelanggan(pelanggan) {
            this.selectedPelanggan = pelanggan
            console.log(this.selectedPelanggan)
            this.showModalPelanggan = false
            this.showModal = false

        },
        fetchPelanggan() {
            Api.getAllPelanggan().then((res) => {

                this.pelangganList = res.data.data
                console.log(this.pelangganList)
            }).catch((err) => {
                alert(err)
            })

        },
        tambahPelanggan() {
            Api.createPelanggan(this.formPelanggan)
                .then((res) => {
                    alert('Data Pelanggan Berhasil Di-Tambahkan!');
                    this.selectedPelanggan = res.data.data
                    console.log(res.data.data)
                    this.closeModal()
                })
                .catch((err) => {
                    console.error(err);
                    alert('Gagal membuat Data Pelanggan.');
                });
        },
        async SearchData() {
            const searchTerm = this.searchInput.toLowerCase();
            if (!searchTerm) {
                this.getObats()
            } else {
                this.dataObat = this.dataObat.filter((obat) => {
                    const kodeObatMatch = obat.kode_obat.toLowerCase().includes(searchTerm);
                    const namaObatMatch = obat.nama_obat.toLowerCase().includes(searchTerm);
                    const namaTipeMatch = obat.tipe_obat?.nama_tipe.toLowerCase().includes(searchTerm);
                    const namaTagMatch = obat.tags.some((tag) => tag.nama_tag.toLowerCase().includes(searchTerm));

                    return kodeObatMatch || namaObatMatch || namaTipeMatch || namaTagMatch;
                });


            }
        },
        fetchLastStok(obat_id) {
            // Cari stok terakhir berdasarkan obat_id
            const stokTerakhir = this.stokList
                .filter((stok) => stok.obat_id === obat_id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

            return stokTerakhir ? stokTerakhir.stok_akhir : 'Obat Belum DiPilih!';
        },
        formattedRupiah(x) {
            return 'Rp ' + x.toLocaleString('id-ID');
        },
        getFullImgPath(img) {
            return Api.getFullImgPath(img);
        },
        getObats() {
            Api.getObat()
                .then((res) => {
                    this.dataObat = res.data.map((obat) => {
                        return {
                            ...obat,
                            jumlah_checkout: 0,
                        };
                    });
                    console.log(this.dataObat);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        closeModal() {
            this.showModal = false
            this.showModalPelanggan = false
            this.showModals = false
        },
        checkImageSize(event, nama) {
            const image = event.target;
            const maxWidth = 250;
            const maxHeight = 250;

            if (image.naturalWidth > maxWidth || image.naturalHeight > maxHeight) {
                image.style.width = `${maxWidth}px`;
                image.style.height = `${maxHeight}px`;
                image.style.objectFit = "cover";

                console.log(`Gambar ${nama} telah di-crop karena melebihi ukuran yang diizinkan.`);
            }
        },

        updateCheckoutList(obat) {
            let index = this.obatCheckout.findIndex(item => item.id_obat === obat.id_obat);

            if (obat.jumlah_checkout > 0) {
                if (index === -1) {
                    this.obatCheckout.push({ ...obat });
                } else {
                    this.obatCheckout[index].jumlah_checkout = obat.jumlah_checkout;
                }
            } else {
                if (index !== -1) {
                    this.obatCheckout.splice(index, 1);
                }
            }
        },

        InputCheckout(obat) {
            let stok_akhir = obat.stok[obat.stok.length - 1].stok_akhir;

            if (obat.jumlah_checkout < 0) {
                obat.jumlah_checkout = 0;
                alert(`Jumlah CheckOut ${obat.nama_obat} tidak bisa kurang dari 0.`);
            } else if (obat.jumlah_checkout > stok_akhir) {
                obat.jumlah_checkout = stok_akhir;
                alert(`${obat.nama_obat} sudah mencapai stok maksimal.`);
            }

            this.updateCheckoutList(obat);
        },

        plus(obat) {
            let stok_akhir = obat.stok[obat.stok.length - 1].stok_akhir;

            if (obat.jumlah_checkout < stok_akhir) {
                obat.jumlah_checkout++;
            } else {
                alert(`${obat.nama_obat} sudah mencapai stok maksimal.`);
            }

            this.updateCheckoutList(obat);
        },

        minus(obat) {
            if (obat.jumlah_checkout > 0) {
                obat.jumlah_checkout--;
            } else {
                alert(`${obat.nama_obat} tidak bisa kurang dari 0.`);
            }

            this.updateCheckoutList(obat);
        },
        showDetail(detail) {
            if (detail.length === 0) {
                alert("Belum ada Obat Yang dipilih!")
                return
            }
            if (!this.selectedPelanggan && !confirm("Ingin Melanjutkan Transaksi Tanpa Data Pelanggan?")) {
                this.showModalPelanggan = true
                return
            }

            if (detail.jumlah_checkout == 0) {
                alert("Jumlah Belum di Isi...")
            } else {
                // console.log(detail)
                this.SelectedObat = detail;
                // for (let index = 0; index < this.SelectedObat.length; index++) {
                //     this.hargaTotal += this.SelectedObat[index].jumlah_checkout * this.SelectedObat[index].harga_jual;
                // }
                // console.log(this.hargaTotal)
                this.showModal = true;
            }
        },
        postTransaksi() {

            this.transaksi.obats = this.obatCheckout.filter((obat) => obat.jumlah_checkout > 0).map((obat) => ({
                id_obat: obat.id_obat,
                jumlah: obat.jumlah_checkout,
                harga: obat.harga_jual
            }));

            if (!this.transaksi.obats.length) {
                alert('Tidak ada obat yang dipilih!');
                return;
            }

            this.transaksi.kode_transaksi = `TRX-${Date.now()}`;
            this.transaksi.handled_by = this.id_user;
            this.transaksi.diskon = this.diskonJumlah
            if (this.selectedPelanggan) {
                this.transaksi.id_pelanggan = this.selectedPelanggan.id_pelanggan
            }
            console.log(this.transaksi)
            Api.createTransaksi(this.transaksi)
                .then(() => {
                    alert('Transaksi berhasil dibuat!');
                    this.getObats();
                    this.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                    alert('Gagal membuat transaksi.');
                });

        },
        resetTransaksi() {
            this.transaksi = {
                kode_transaksi: '',
                total_harga: 0,
                status: 'pending',
                obats: []
            };

            this.dataObat.forEach((obat) => {
                obat.jumlah_checkout = 0;
            });

            this.showModal = false;
        }

    }
}
</script>

<style scoped>
img {
    display: block;
}

/* Hilangkan spinner pada input type="number" */
input[type="number"].no-spinner::-webkit-inner-spin-button,
input[type="number"].no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"].no-spinner {
    -moz-appearance: textfield;
    /* Firefox */
}
</style>