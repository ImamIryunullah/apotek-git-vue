<template>
    <!-- Filter -->
    <div class="pb-10">
        <div class="font-Roboto tracking-wider ">
            <div class="bg-white -mx-10 flex items-center justify-between px-20">
                <div>
                    <div class="flex space-x-3 py-4 relative -left-6">
                        <div>
                            <div>
                                <div @click="dropdownKodeObat"
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
                                </div>
                                <div v-if="isKodeObatOpen"
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
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div class="relative">
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
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-red-600 hover:bg-emerald-700 border border-black rounded-lg">
                                <button class="px-6 py-2 font-bold text-white">
                                    <h1>Filter</h1>
                                </button>
                            </div>
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


    <div class="font-Roboto">
        <div class="grid grid-cols-4 gap-20">
            <!-- <div v-for="obat in dataObat.filter((obats) => obats.stok.length > 0 && obats.stok[obats.stok.length -
                1].stok_akhir > 0)" :key="obat.nama_obat"
                class="p-4 capitalize text-white max-w-[50rem] h-[38rem] bg-emerald-600 rounded-xl border-2 border-black py-6"> -->
            <div v-for="obat in dataObat.filter((obats) => obats.stok.length > 0)" :key="obat.nama_obat"
                class="p-4 capitalize text-white max-w-96 h-[55rem] bg-emerald-600 rounded-xl border-2 border-black py-6 flex flex-col justify-between">
                <div class="flex-1">
                    <div class="px-4">
                        <div class="border-2 border-black rounded-2xl bg-gray-100">
                            <img :src="getFullImgPath(obat.gambar_obat)" class="w-60 max-h-44 object-cover mx-auto"
                                ref="imageRefs" @load="checkImageSize($event, obat.nama_obat)">
                        </div>
                    </div>
                    <div class="px-4 py-2 space-y-4">
                        <div class="flex justify-between">
                            <div class="flex space-x-2 pb-4">
                                <div>
                                    <h1 class="text-2xl font-bold mt-2">{{ obat.nama_obat }}</h1>

                                    <h1 class="text-lg font-semibold text-white pt-2">{{
                                        formattedRupiah(obat.harga_jual) }}
                                    </h1>
                                </div>
                                <div class="mt-4">
                                    <h1 class="text-base font-semibold">. {{ obat.dosis_obat }}</h1>
                                </div>
                            </div>
                            <div>
                                <h1 class="text-lg font-semibold mt-2">Stok : {{ obat.stok[obat.stok.length -
                                    1].stok_akhir > 0 ? obat.stok[obat.stok.length -
                                        1].stok_akhir : "Habis"
                                }}
                                </h1>

                            </div>
                        </div>
                        <div>
                            <h1 class=" text-white text-1xl font-bold">{{ obat.merk_obat }}</h1>
                        </div>
                        <div>
                            <h1 class="text-base text-white">{{ obat.deskripsi }}</h1>
                        </div>
                        <div class="bg-black h-0.5"></div>
                        <div class="space-y-4">
                            <!-- Tag -->
                            <div>
                                <div class="font-semibold mb-1">
                                    <h1>Tag:</h1>
                                </div>
                                <div class="flex flex-wrap gap-2 break-words">
                                    <div v-for="tag in obat.tags" :key="tag.id_tag_obat"
                                        class="bg-white text-black border border-black px-4 py-2 rounded-2xl text-sm">
                                        {{ tag.nama_tag }}
                                    </div>
                                </div>
                            </div>

                            <!-- Tipe Obat -->
                            <div>
                                <div class="font-semibold mb-1">
                                    <h1>Tipe Obat:</h1>
                                </div>
                                <div
                                    class="bg-white text-black border border-black px-4 py-2 rounded-2xl text-sm inline-block">
                                    {{ obat.tipe_obat.nama_tipe }}
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between pt-4 py-20 m-10">
                            <div class="flex space-x-6 px-4 py-2 bg-white border rounded-xl border-black h-[4rem]">
                                <button @click="minus(obat)" class="pl-2 pt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
                                        stroke-width="2.5" stroke="#000000" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                                <div class="bg-che text-white text-lg rounded-xl">
                                    <input type="number"
                                        class="bg-che px-4 py-2 font-s mibold text-white rounded-xl w-20 text-center no-spinner"
                                        v-model="obat.jumlah_checkout"
                                        @input="console.log('Updated Value:', obat.jumlah_checkout)"
                                        @change="InputCheckout(obat)">
                                </div>
                                <button @click="plus(obat)" class="pl-2 pt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
                                        stroke-width="2.5" stroke="#000000" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="showModal"
                    class="fixed inset-0 bg-gray-700 bg-opacity-10 flex justify-center items-center z-50">
                    <div class="bg-white rounded-lg shadow-lg pl-10 pt-10 pb-20 w-[60rem]">
                        <div class="flex justify-between px-6">
                            <h2 class="text-lg font-semibold text-black">Detail Transaksi</h2>
                            <button @click="closeModal" class="hover:fill-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div class="border-b-2 my-4"></div>
                        <div class="overflow-x-auto overflow-y-auto max-h-[400px]">
                            <table v-for="(listCheckout, index) in SelectedObat" :key="listCheckout.id_obat"
                                class="text-black w-full px-6">
                                <div class="border-b-2">
                                    <h1> List Checkout Obat {{ index + 1 }}</h1>
                                </div>
                                <tbody>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Kode Obat</th>
                                        <td>{{ listCheckout.kode_obat }}</td>
                                    </tr>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Nama Obat</th>
                                        <td>{{ listCheckout.nama_obat }}</td>
                                    </tr>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Dosis</th>
                                        <td>{{ listCheckout.dosis_obat }}</td>
                                    </tr>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Tag</th>
                                        <td>
                                            <div class="flex flex-wrap">
                                                <span v-for="tag in listCheckout.tags" :key="tag.id_tag_obat"
                                                    class="bg-gray-200 text-black px-2 py-1 rounded-lg m-1">
                                                    {{ tag.nama_tag }}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Harga Obat</th>
                                        <td>{{ formattedRupiah(listCheckout.harga_jual) }}</td>
                                    </tr>
                                    <tr class="border-b">
                                        <th class="text-start py-3 pr-10">Jumlah</th>
                                        <td>{{ listCheckout.jumlah_checkout }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-start py-3 pr-10">Total Harga</th>
                                        <td>{{ formattedRupiah(listCheckout.jumlah_checkout * listCheckout.harga_jual)
                                        }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="border border-b-2"></div>
                            <div class="border border-b-2"></div>
                            <div class="text-black">
                                <label class="text-start py-1 pr-10">Diskon (%)</label>
                                <input class=" text-start py-1 pr-10" type="number" v-model="diskonPersen">
                            </div>
                            <div class="border border-b-1"></div>
                            <div class="text-black">
                                <label class="text-start py-1 pr-10">Total Harga {{ hargaTotals }}</label>
                                <label class="text-start py-1 pr-10">Diskon Harga {{ diskonJumlah }}</label>
                                <label class="text-start py-1 pr-10">Harga Setelah Diskon {{ hargaSetelahDiskon
                                }}</label>
                            </div>
                            <div class="border border-b-1"></div>
                            <div v-if="selectedPelanggan" class="border-b-2 text-black">
                                <h1> Data Pelanggan</h1>
                                <div class="">
                                    <label for=""> Nama : {{ selectedPelanggan.nama }} </label>
                                    <label for=""> Alamat : {{ selectedPelanggan.alamat }} </label>
                                    <label for=""> No Hp : {{ selectedPelanggan.telepon }} </label>
                                    <label for=""> Email : {{ selectedPelanggan.email }} </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center mt-10">
                            <button @click="postTransaksi"
                                class="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-700">
                                Buat Transaksi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <!-- Floating Checkout Button -->
        <div class="fixed bottom-20 right-5">
            <div class="flex justify-center">

                <button @click="showDetail(obatCheckout)"
                    class="bg-white hover:bg-emerald-700 hover:text-white font-bold px-10 py-5 rounded-lg shadow-lg border border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#8c8200" viewBox="0 0 24 24" stroke-width="1.0"
                        stroke="#8c8200" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <div v-if="selectedPelanggan !== null">
                        <label for="">Pelanggan : {{ selectedPelanggan.nama }}</label>
                    </div>
                    <h1>Checkout</h1>
                </button>

            </div>

        </div>
    </div>
    <div v-if="showModalPelanggan"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 class="text-lg font-bold mb-4">Pilih Opsi</h2>

            <div class="flex justify-around">
                <button @click="modalType = 'tambah', showModals = true"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Pelanggan baru
                </button>
                <button @click="modalType = 'pilih', showModals = true"
                    class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Pelanggan Lama
                </button>
            </div>

            <div v-if="modalType === 'tambah' && showModals" class="mt-4">
                <h3 class="text-md font-semibold mb-2">Tambah Pelanggan</h3>
                <label for="">Nama : </label>
                <input v-model="formPelanggan.nama" type="text" placeholder="Nama"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label for="">Email : </label>
                <input v-model="formPelanggan.email" type="email" placeholder="Email"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label for="">No Telpon : </label>
                <input v-model="formPelanggan.telepon" type="tel" placeholder="No Telpon"
                    class="w-full px-3 py-2 border rounded mb-2" />
                <label for="">Alamat : </label>
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

            <div class="text-right mt-4">
                <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Tutup
                </button>
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
