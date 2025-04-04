<template>
    <!-- filter -->
    <div class="font-Roboto tracking-wider">
        <div class="bg-white -mx-10 flex items-center justify-between px-20">
            <div>
                <div class="flex space-x-4 py-6 relative -left-6">
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
                        <div class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
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
                        type="text" placeholder="Cari disini...">
                </div>
                <div class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
                    <button class="px-6 py-2 font-bold text-white">
                        <h1>Cari</h1>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="font-Roboto tracking-wider -mx-2">
        <div class="px-6 pt-6 min-h-screen">
            <div class="flex space-x-10">
                <div>
                    <button @click="openModal"
                        class="px-4 bg-emerald-600 border border-black rounded-lg text-white hover:bg-emerald-700 py-2 transition duration-300 font-semibold">
                        Tambah Stok Obat Baru
                    </button>
                </div>
                <button @click="openModalUpdatestoks"
                    class="px-4 bg-emerald-600 border border-black rounded-lg text-white hover:bg-emerald-700 py-2 transition duration-300 font-semibold">
                    Tambah Stok
                </button>
            </div>
            <div class="overflow-x-auto mt-4">
                <div></div>
                <table class="min-w-full bg-white border border-gray-200 shadow-md text-base rounded-lg">
                    <thead>
                        <tr class="bg-gray-200 text-left text-base">
                            <th class="pl-10 py-3 border-b border-gray-300">ID Stok</th>
                            <th class="px-4 py-3 border-b border-gray-300">Kode Obat</th>
                            <th class="px-4 py-3 border-b border-gray-300">Nama Obat</th>
                            <th class="px-4 py-3 border-b border-gray-300">Tipe Transaksi</th>
                            <th class="px-4 py-3 border-b border-gray-300">Stok Awal</th>
                            <th class="px-4 py-3 border-b border-gray-300">Jumlah Transaksi</th>
                            <th class="px-4 py-3 border-b border-gray-300">Stok Sekarang</th>
                            <th class="px-4 py-3 border-b border-gray-300">Lokasi</th>
                            <th class="px-4 py-3 border-b border-gray-300">Tanggal Kadaluarsa</th>
                            <th class="px-4 py-3 border-b border-gray-300">Keterangan</th>
                            <th class="px-4 py-3 border-b border-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stok in paginatedTransaksi" :key="stok.id" class="hover:bg-gray-100 text-base">
                            <td class="pl-10 py-6 border-b border-gray-300 font-bold">{{ stok.id_stok }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">
                                {{
                                    obatList.find((obat) => obat.id_obat === stok.obat_id)?.kode_obat || "Tidak Diketahui"
                                }}
                            </td>
                            <td class="px-4 py-6 border-b border-gray-300">
                                {{
                                    obatList.find((obat) => obat.id_obat === stok.obat_id)?.nama_obat || "Tidak Diketahui"
                                }}
                            </td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.tipe_transaksi }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.stok_awal }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.jumlah_stok_transaksi }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.stok_akhir }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.lokasi }}</td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ getTanggal(stok.tanggal_kadaluwarsa) }}
                            </td>
                            <td class="px-4 py-6 border-b border-gray-300">{{ stok.keterangan }}</td>
                            <td class="px-4 py-6 border-b border-gray-300 flex items-center space-x-4">
                                <button>
                                    <div class="p-2 rounded hover:bg-gray-200 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </div>
                                </button>
                                <button @click="deleteStok(stok.id_stok)" class="px-4 transition duration-300">
                                    <div class="p-2 rounded hover:bg-gray-200 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div class="flex justify-end pt-6 pr-30 pb-10">
                    <div class="flex justify-between space-x-4">
                        <button>
                            <div @click="prev"
                                class="border border-black bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md">
                                <div>
                                    <h1>Prev</h1>
                                </div>
                            </div>
                        </button>
                        <div class="text-center mt-4">
                            <span>Page {{ currentPage }} of {{ totalPages }}</span>
                        </div>
                        <button>
                            <div @click="next"
                                class="border border-black bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md">
                                <div>
                                    <h1>Next</h1>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="isModalOpen"
                class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white rounded-lg shadow-lg pt-10 pb-16 w-[30rem]">
                    <div class="-mt-6 pb-4">
                        <div class="flex justify-end pr-6 pt-2">
                            <button @click="closeModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                                    viewBox="0 0 256 256" class="hover:fill-red-600">
                                    <path
                                        d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <h2 class="text-lg font-semibold text-center">Tambah Stok Obat Baru</h2>
                    </div>
                    <div class="border-b-2"></div>
                    <form @submit.prevent="createStok" class="px-6 py-4 space-y-4">
                        <!-- Pilihan Obat -->
                        <div>
                            <label for="obat" class="block text-sm font-medium text-gray-700">Obat:</label>
                            <select v-model="stokForm.obat_id"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option v-for="obat in obatList.filter(obats => obats.stok.length === 0)"
                                    :key="obat.id_obat" :value="obat.id_obat">
                                    {{ obat.nama_obat }}
                                </option>
                            </select>
                        </div>

                        <!-- Stok Awal -->
                        <div>
                            <label for="stok_awal" class="block text-sm font-medium text-gray-700">Stok Awal:</label>
                            <input type="number" v-model.number="stokForm.stok_awal"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan stok awal" min="1" required>
                        </div>

                        <!-- Lokasi -->
                        <div>
                            <label for="lokasi" class="block text-sm font-medium text-gray-700">Lokasi:</label>
                            <input type="text" v-model="stokForm.lokasi"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan lokasi stok (contoh: Gudang A)" required>
                        </div>

                        <!-- Tanggal Kadaluarsa -->
                        <div>
                            <label for="tanggal_kadaluwarsa" class="block text-sm font-medium text-gray-700">Tanggal
                                Kadaluarsa:</label>
                            <input type="date" v-model="stokForm.tanggal_kadaluwarsa"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required>
                        </div>

                        <!-- Keterangan -->
                        <div>
                            <label for="keterangan" class="block text-sm font-medium text-gray-700">Keterangan:</label>
                            <textarea v-model="stokForm.keterangan"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan keterangan (opsional)"></textarea>
                        </div>

                        <!-- Tombol Submit -->
                        <div class="flex justify-end space-x-4">
                            <button type="submit"
                                class="px-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                                Tambah
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="isModalOpenUpdate"
                class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white rounded-lg shadow-lg pt-10 pb-16 w-[30rem]">
                    <div class="-mt-6 pb-4">
                        <div class="flex justify-end pr-6 pt-2">
                            <button @click="closeModalupdate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                                    viewBox="0 0 256 256" class="hover:fill-red-600">
                                    <path
                                        d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <h2 class="text-lg font-semibold text-center">Restock Obat</h2>
                    </div>
                    <div class="border-b-2"></div>
                    <form @submit.prevent="createUpdatestok(stokForm.obat_id)" class="px-6 py-4 space-y-4">
                        <div>
                            <label for="obat" class="block text-sm font-medium text-gray-700">Obat:</label>
                            <select v-model="stokForm.obat_id"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option v-for="obat in obatList.filter(obats => obats.stok.length > 0)"
                                    :key="obat.id_obat" :value="obat.id_obat">
                                    {{ obat.nama_obat }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="stok_akhir" class="block text-sm font-medium text-gray-700">Stok
                                Sebelumnya:</label>
                            <input type="text" :value="fetchLastStok(stokForm.obat_id)" disabled
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100">
                        </div>
                        <div>
                            <label for="stok_awal" class="block text-sm font-medium text-gray-700">Tambah Stok:</label>
                            <input type="number" v-model.number="stokForm.jumlah_stok_transaksi"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan jumlah stok tambahan" required>
                        </div>
                        <div>
                            <label for="keterangan" class="block text-sm font-medium text-gray-700">Keterangan:</label>
                            <textarea v-model="stokForm.keterangan"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <div class="flex justify-end space-x-4">
                            <button type="submit"
                                class="px-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">Tambah</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import api from "@/services/Api";
export default {
    data() {
        return {
            stokList: [],
            obatList: [],
            currentPage: 1,
            itemsPerPage: 10,
            isJenisObatOpen: false,
            isKodeObatOpen: false,
            iSJenisPenyakit: false,
            searchInput: '',
            stokForm: {
                id_stok: null,
                obat_id: null,
                stok_awal: null,
                tipe_transaksi: "MASUK",
                keterangan: "",
                tanggal_kadaluwarsa: null,
                lokasi: '',
                jumlah_stok_transaksi: null
            },
            isModalOpen: false,
            isModalOpenUpdate: false,
        };
    },
    computed: {
        selectedObat() {
            return this.obatList.find(obat => obat.id_obat === this.stokForms.obat_id) || null;
        },
        totalPages() {
            return Math.ceil(this.stokList.length / this.itemsPerPage);
        },
        paginatedTransaksi() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.stokList.slice(start, end);
        }
    },
    methods: {
        getTanggal(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        },
        next() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prev() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        async SearchData() {
            const searchTerm = this.searchInput.toLowerCase();
            if (!searchTerm) {
                this.fetchObat()
                this.fetchStok()
            } else {
                this.obatList = this.obatList.filter((obat) => {
                    const kodeObatMatch = obat.kode_obat.toLowerCase().includes(searchTerm);
                    const namaObatMatch = obat.nama_obat.toLowerCase().includes(searchTerm);
                    const namaTipeMatch = obat.tipe_obat?.nama_tipe.toLowerCase().includes(searchTerm);
                    const namaTagMatch = obat.tags.some((tag) => tag.nama_tag.toLowerCase().includes(searchTerm));

                    return kodeObatMatch || namaObatMatch || namaTipeMatch || namaTagMatch;
                });

                this.stokList = this.stokList.filter((stok) =>
                    this.obatList.some((obat) => obat.id_obat === stok.obat_id)
                );
            }
        },
        dropdownJenisObat() {
            this.isJenisObatOpen = !this.isJenisObatOpen;
        },
        dropdownKodeObat() {
            this.isKodeObatOpen = !this.isKodeObatOpen
        },
        dropdownJenisPenyakit() {
            this.iSJenisPenyakit = !this.iSJenisPenyakit
        },
        fetchLastStok(obat_id) {
            const stokTerakhir = this.stokList
                .filter((stok) => stok.obat_id === obat_id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
            // this.stokForm.id_stok = stokTerakhir.id_stok
            return stokTerakhir ? stokTerakhir.stok_akhir : 'Obat Belum Di-Pilih!';
        },
        fetchStok() {
            api
                .getAllStok()
                .then((response) => {
                    this.stokList = response.data.data;
                    // this.dataObat.sort((a, b) => b.id_obat - a.id_obat);
                    this.stokList.sort((a, b) => b.id_stok - a.id_stok)
                    console.log(this.stokList)
                })
                .catch((error) => {
                    console.error("Error fetching stok:", error);
                });
        },
        fetchObat() {
            api
                .getObat()
                .then((response) => {
                    this.obatList = response.data;
                    console.log(this.obatList)
                })
                .catch((error) => {
                    console.error("Error fetching obat:", error);
                });
        },
        async createStok() {
            if (!this.stokForm.obat_id || !this.stokForm.stok_awal || !this.stokForm.tanggal_kadaluwarsa || !this.stokForm.lokasi) {
                alert('Harap lengkapi semua field yang diperlukan!');
                return;
            }
            this.stokForm.jumlah_stok_transaksi = this.stokForm.stok_awal;

            // Data untuk API
            const data = {
                ...this.stokForm,
            };
            console.log(data)
            api.createStok(data)
                .then(() => {
                    alert("Stok berhasil ditambahkan!");
                    this.closeModal();
                    this.fetchStok();
                })
                .catch((error) => {
                    console.error("Error creating stok:", error);
                    alert("Gagal menambahkan stok.");
                });
        },
        createUpdatestok(obat_id) {
            if (!this.stokForm.obat_id || this.stokForm.jumlah_stok_transaksi === null) {
                alert("Pilih obat dan masukkan stok tambahan!");
                return;
            }
            if (this.stokForm.jumlah_stok_transaksi <= 0) {
                alert("Stok tambahan tidak boleh 0 atau negatif!");
                return;
            }
            const stokTerakhir = this.stokList
                .filter((stok) => stok.obat_id === obat_id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
            this.stokForm.id_stok = stokTerakhir.id_stok
            const data = {
                jumlah_stok_transaksi: this.stokForm.jumlah_stok_transaksi,
                keterangan: this.stokForm.keterangan,
            };

            api.updateStok(stokTerakhir.id_stok, data)
                .then(() => {
                    alert("Stok berhasil ditambahkan!");
                    this.closeModalupdate();
                    this.fetchStok();
                })
                .catch((error) => {
                    console.error("Error creating stok:", error);
                    alert("Gagal menambahkan stok.");
                });
        },

        async deleteStok(id) {
            if (confirm("Apakah Anda yakin ingin menghapus stok ini?")) {
                api
                    .deleteStok(id)
                    .then(() => {
                        alert("Stok berhasil dihapus!");
                        this.fetchStok();
                    })
                    .catch((error) => {
                        console.error("Error deleting stok:", error);
                        alert("Gagal menghapus stok.");
                    });
            }
            await this.fetchStok()
        },
        openModal() {
            this.isModalOpen = true;
        },
        openModalUpdatestoks() {
            // const stokTerakhir = this.stokList
            //     .filter((stok) => stok.obat_id === obat_id)
            //     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
            // this.stokForm.id_stok = stokTerakhir.id_stok
            this.isModalOpenUpdate = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },
        closeModalupdate() {
            this.isModalOpenUpdate = false;
        },
        resetForm() {
            this.stokForm = {
                id: null,
                obat_id: null,
                jumlah: null,
                tipe_transaksi: "MASUK",
                keterangan: "",
            };
            this.editingStok = false;
        },
    },
    mounted() {
        this.fetchStok();
        this.fetchObat();

    },
};
</script>