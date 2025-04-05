<template>
    <div class="font-Roboto tracking-wider">
        <div class="bg-white -mx-10">
            <div class="px-12 pt-6 pb-2 flex justify-between space-x-4">
                <div class="w-full">
                    <div class="w-full">
                        <input type="date" id="filter-date" v-model="filterDate"
                            class="rounded-lg px-4 py-2 w-full mb-4 border border-black">
                    </div>
                </div>
                <div class="flex">
                    <button @click="applyFilter"
                        class="px-4 bg-emerald-600 border border-black rounded-lg text-white hover:bg-emerald-700 h-[2.6rem]">
                        Filter
                    </button>
                    <!-- <button @click="resetFilter"
                        class="px-4 bg-gray-500 border border-black rounded-lg text-white hover:bg-gray-600 ml-2 h-[2.6rem]">
                        Reset
                    </button> -->
                </div>
            </div>
        </div>

        <div class="overflow-x-auto font-Roboto pt-6">
            <table class="min-w-full bg-white border border-gray-200 shadow-md text-base rounded-lg">
                <thead>
                    <tr class="bg-gray-200 text-left">
                        <th class="pl-20 py-3 border-b border-gray-300">No</th>
                        <th class="px-4 py-3 border-b border-gray-300">Kode</th>
                        <th class="px-4 py-3 border-b border-gray-300">Detail</th>
                        <th class="px-4 py-3 border-b border-gray-300">Tanggal</th>
                        <th class="px-4 py-3 border-b border-gray-300">Waktu</th>
                        <th class="px-4 py-3 border-b border-gray-300">Jumlah</th>
                        <th class="px-4 py-3 border-b border-gray-300">Diskon</th>
                        <th class="px-4 py-3 border-b border-gray-300">Harga Total</th>
                        <th class="pl-8 py-3 border-b border-gray-300">Metode Bayar</th>
                        <th class="pl-8 py-3 border-b border-gray-300">Status Bayar</th>
                        <th class="pl-8 py-3 border-b border-gray-300">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaksi in paginatedTransaksi" :key="transaksi.id" class="hover:bg-gray-100">
                        <td class="pl-20 py-2 border-b border-gray-300 font-bold">{{ transaksi.id_transaksi }}</td>
                        <td class="px-4 py-2 border-b border-gray-300">{{ transaksi.kode_transaksi }}</td>
                        <td class="px-4 py-2 border-b border-gray-300 text-sm">
                            <div class="flex">
                                <div class="cursor-pointer p-2 rounded hover:bg-gray-200 items-center"
                                    @click="showDetail(transaksi)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="#176B87" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-2 border-b border-gray-300">{{ transaksi.created_at.split('T')[0] }}</td>
                        <td class="px-4 py-2 border-b border-gray-300">{{
                            transaksi.created_at.split('T')[1].split("-")[0] }}</td>
                        <td class="px-4 py-2 border-b border-gray-300">{{ sumJumlah(transaksi.obats) }}</td>
                        <td class="px-4 py-2 border-b border-gray-300">{{ formattedRupiah(transaksi.diskon) }}</td>
                        <td class="px-4 py-2 border-b border-gray-300">{{ formattedRupiah(transaksi.total_harga) }}</td>
                        <td class="px-10 py-2 border-b border-gray-300">{{ transaksi.metode_bayar }}</td>
                        <td class="px-10 py-2 border-b border-gray-300">{{ transaksi.status }}</td>
                        <td class="px-4 pb-4 border-b border-gray-300 flex items-center space-x-4 pt-6">
                            <button @click="openEditModal(transaksi)">
                                <div class="p-2 rounded hover:bg-gray-200 cursor-pointer relative -top-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="flex justify-end pt-6 pr-20">
                    <div class="flex justify-between space-x-4">
                        <button>
                            <div @click="prevPage"
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
                            <div @click="nextPage"
                                class="border border-black bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md">
                                <div>
                                    <h1>Next</h1>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showModals" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg pt-10 pb-16 w-[30rem]">
                <div class="flex justify-end pr-6 pt-2">
                    <button @click="closeModals">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                            viewBox="0 0 256 256" class="hover:fill-red-600">
                            <path
                                d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="px-10">
                    <h2 class="text-lg font-semibold text-center">Verifikasi Transaksi</h2>
                    <form @submit.prevent="updateStatus()">
                        <div class="mb-4">
                            <label class=" block text-sm font-medium">Nama Obat :{{ selectedDetail.id_obat }}</label>

                            <div class="overflow-x-auto overflow-y-auto max-h-[400px]">
                                <table v-for="(listCheckout) in selectedDetail.obats" :key="listCheckout.id_obat"
                                    class="flex justify-center w-full">

                                    <tbody>
                                        <tr class="py-3 border-b border-gray-300">
                                            <th scope=" row"
                                                class="text-start py-3 border-b border-gray-300 pl-4 pr-32">Kode
                                                Obat
                                            </th>
                                            <td>{{ listCheckout.obat.kode_obat }}</td>
                                        </tr>
                                        <tr class="py-3 border-b border-gray-300">
                                            <th scope="row" class="text-start py-3 border-b border-gray-300 pl-4 pr-32">
                                                Nama
                                                Obat
                                            </th>
                                            <td>{{ listCheckout.obat.nama_obat }}</td>
                                        </tr>
                                        <tr class="py-3 border-b border-gray-300">
                                            <th scope="row" class="text-start py-3 border-b border-gray-300 pl-4 pr-32">
                                                Dosis
                                            </th>
                                            <td>{{ listCheckout.obat.dosis_obat }}</td>
                                        </tr>
                                        <tr class="py-3 border-b border-gray-300">
                                            <th scope="row" class="text-start py-3 border-b border-gray-300 pl-4 pr-32">
                                                Tag</th>
                                            <td>
                                                <div class="flex flex-wrap">
                                                    <span v-for="(tag, index) in listCheckout.obat.tags" :key="index"
                                                        class="bg-gray-200 text-black px-2 py-1 rounded-lg m-1">
                                                        {{ tag.nama_tag }}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr class="py-3 border-b border-gray-300">
                                            <th scope="row" class="text-start py-3 border-b border-gray-300 pl-4 pr-32">
                                                Harga
                                                Obat
                                            </th>
                                            <td>{{ formattedRupiah(listCheckout.obat.harga_jual) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <label for="" class="block text-sm font-medium">Status</label>
                            <select v-model="statusChange">
                                <option value="PENDING" selected disabled hidden>Choose here</option>
                                <Option value="SUCCESS">SUCCESS</Option>
                                <Option value="CANCEL">CANCEL</Option>
                            </select>

                            <label for="">Upload Bukti Pembayaran:</label>
                            <input type="file" @change="handleFileUpload" />

                        </div>
                        <div class="flex justify-end">
                            <button type="submit"
                                class="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg pt-5 pb-10 w-[40rem]">
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
                <div v-if="detailsObat" class="space-y-4">

                    <div class="text-center">
                        <h2 class="text-lg font-semibold">Detail Obat</h2>
                        <div class="border-b-2 border-gray-300 mt-2"></div>
                    </div>


                    <div class="overflow-y-auto max-h-[400px] space-y-6">
                        <div v-for="(listCheckout) in selectedDetail.obats" :key="listCheckout.id_obat"
                            class="bg-gray-50 rounded-lg shadow p-4 w-full max-w-3xl mx-auto space-y-2">
                            <div class="flex justify-between">
                                <span class="font-medium text-sm text-gray-600">Kode Obat</span>
                                <span class="text-sm">{{ listCheckout.obat.kode_obat }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-medium text-sm text-gray-600">Nama Obat</span>
                                <span class="text-sm">{{ listCheckout.obat.nama_obat }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-medium text-sm text-gray-600">Dosis</span>
                                <span class="text-sm">{{ listCheckout.obat.dosis_obat }}</span>
                            </div>
                            <div>
                                <span class="font-medium text-sm text-gray-600">Tag</span>
                                <div class="flex flex-wrap mt-1">
                                    <span v-for="(tag, index) in listCheckout.obat.tags" :key="index"
                                        class="bg-gray-200 text-black px-2 py-1 rounded-full text-xs mr-1 mb-1">
                                        {{ tag.nama_tag }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-medium text-sm text-gray-600">Harga Obat</span>
                                <span class="text-sm">{{ formattedRupiah(listCheckout.obat.harga_jual) }}</span>
                            </div>
                        </div>

                        <div class="text-center space-y-2">
                            <h3 class="font-medium text-sm">Bukti Transaksi</h3>
                            <div v-if="selectedDetail.bukti_pembayaran">
                                <img :src="getFullImage(selectedDetail.bukti_pembayaran)"
                                    class="w-60 max-h-44 object-cover mx-auto rounded border shadow" ref="imageRefs"
                                    @load="checkImageSize($event, selectedDetail.id_transaksi)" />
                            </div>
                            <div v-else class="text-sm text-gray-500">
                                Belum ada Bukti Transaksi
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/services/Api';

export default {
    data() {
        return {
            filterDate: "",
            filteredTransaksi: [],
            currentPage: 1,
            itemsPerPage: 5,
            showModal: false,
            statusChange: '',
            showModals: false,
            selectedDetail: {},
            dataTransaksi: [],
            detailsObat: true,
            detailsStok: false
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredTransaksi.length / this.itemsPerPage);
        },
        paginatedTransaksi() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            return this.filteredTransaksi.slice(start, end);
        }
    },
    methods: {
        sumJumlah(obats) {
            return obats.reduce((total, obat) => {
                return total + obat.jumlah; // Jumlahkan setiap 'jumlah' dari setiap objek dalam array
            }, 0);
        },
        openEditModal(transaksi) {
            if (!transaksi || !transaksi.obats || transaksi.obats.length === 0) {
                alert("Transaksi atau detail obat tidak valid.");
                return;
            }
            console.log(transaksi)
            // Mapping array obat dari transaksi untuk mendapatkan detail
            this.selectedDetail = transaksi
            this.statusChange = this.selectedDetail.status

            console.log("Selected details:", this.selectedDetail);
            this.showModals = true;

        }
        ,
        handleFileUpload(event) {
            this.selectedDetail.bukti_pembayaran = event.target.files[0];
        },
        updateStatus() {
            // Validasi input
            if (!this.selectedDetail) {
                alert("Jumlah transaksi harus lebih dari 0.");
                return;
            }
            const updatedData = {
                status: this.statusChange,
                bukti_pembayaran: this.selectedDetail.bukti_pembayaran
            };

            console.log("Updated data:", updatedData);
            console.log(this.selectedDetail.id_transaksi)
            const id = this.selectedDetail.id_transaksi
            Api.updateStatusTransaksi(id, updatedData)
                .then(() => {
                    alert(`Jumlah transaksi ${id} berhasil diperbarui!`);
                    this.getTransaksi();
                    this.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                    const errorMessage = err.response?.data?.error || "Terjadi kesalahan saat memperbarui jumlah transaksi.";
                    alert(`Gagal memperbarui jumlah transaksi ${id}. ${errorMessage}`);
                });
        }
        ,
        getFullImage(img) {
            return Api.getFullImgPath(img)
        },
        next() {
            this.detailsObat = false;
            this.detailsStok = true
        },
        prev() {
            this.detailsStok = false;
            this.detailsObat = true
        },
        showDetail(transaksi) {
            console.log(transaksi);
            if (transaksi && transaksi.obats.length > 0) {
                this.selectedDetail = transaksi;
                this.showModal = true;
            } else {
                console.error("No obat details found for this transaksi");
            }
        },
        formattedRupiah(x) {
            if (!x || isNaN(x)) {
                return 'Rp 0';
            }
            return 'Rp ' + x.toLocaleString('id-ID');
        },
        getTransaksi() {
            Api.getAllTransaksi()
                .then((res) => {
                    this.dataTransaksi = res.data;
                    this.filteredTransaksi = this.dataTransaksi;
                    console.log(this.dataTransaksi)
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        closeModal() {
            this.showModal = false;
            this.showModals = false;
            this.selectedDetail = null;
        },
        closeModals() {
            this.showModals = false;
            this.selectedDetail = null;
        },
        applyFilter() {
            this.filteredTransaksi = this.dataTransaksi.filter(transaksi => {
                return (!this.filterDate || transaksi.tanggal === this.filterDate);
            });
            this.currentPage = 1;
        },
        // resetFilter() {
        //     this.filterDate = "";
        //     this.filteredTransaksi = this.transaksis;
        // },
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
    },
    mounted() {
        this.getTransaksi()
    }
};
</script>
