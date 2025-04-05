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
                </div>
            </div>
        </div>
        <div class="overflow-x-auto font-Roboto py-4">
            <table class="min-w-full bg-white border border-gray-200 shadow-md text-sm rounded-lg">
                <thead class="text-white">
                    <tr class="bg-emerald-600 text-left">
                        <th class="px-4 py-2 border-b border">ID</th>
                        <th class="px-4 py-2 border-b border">Kode</th>
                        <th class="px-4 py-2 border-b border">Detail</th>
                        <th class="px-4 py-2 border-b border">Tanggal</th>
                        <th class="px-4 py-2 border-b border">Waktu</th>
                        <th class="px-4 py-2 border-b border">Jumlah</th>
                        <th class="px-4 py-2 border-b border">Total</th>
                        <th class="px-4 py-2 border-b border">Metode</th>
                        <th class="px-4 py-2 border-b border">Status</th>
                        <th class="px-4 py-2 border-b border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaksi in paginatedTransaksi" :key="transaksi.id" class="hover:bg-gray-100">
                        <td class="px-4 py-2 border-b border font-bold">{{ transaksi.id_transaksi }}</td>
                        <td class="px-4 py-2 border-b border">{{ transaksi.kode_transaksi }}</td>
                        <td class="px-4 py-2 border-b border">
                            <div @click="showDetail(transaksi)"
                                class="cursor-pointer p-1 rounded hover:bg-gray-200 inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-700" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625a1.125 1.125 0 0 0-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75a1.125 1.125 0 0 0 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </div>
                        </td>
                        <td class="px-4 py-2 border-b border">{{ transaksi.created_at.split('T')[0] }}</td>
                        <td class="px-4 py-2 border-b border">{{
                            transaksi.created_at.split('T')[1].split("-")[0] }}</td>
                        <td class="px-4 py-2 border-b border">{{ sumJumlah(transaksi.obats) }}</td>
                        <td class="px-4 py-2 border-b border">{{ formattedRupiah(transaksi.total_harga) }}</td>
                        <td class="px-4 py-2 border-b border">{{ transaksi.metode_bayar }}</td>
                        <td class="px-4 py-2 border-b border">{{ transaksi.status }}</td>
                        <td class="px-4 py-2 border-b border">
                            <div class="flex space-x-2">
                                <button @click="openEditModal(transaksi)" class="p-1 rounded hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 0 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                    </svg>
                                </button>
                                <button @click="deleteTransaksi(transaksi)" class="p-1 rounded hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084A2.25 2.25 0 0 1 5.84 19.673L4.772 5.79a48.108 48.108 0 0 1 3.478-.397m7.5 0a48.667 48.667 0 0 0-7.5 0v-.916c0-1.18.91-2.164 2.09-2.201a51.964 51.964 0 0 1 3.32 0c1.18.037 2.09 1.022 2.09 2.201v.916Z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="flex justify-end pt-4 pr-6">
                <div class="flex items-center space-x-4 text-sm">
                    <button @click="prevPage"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded-md border border-black">
                        Prev
                    </button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded-md border border-black">
                        Next
                    </button>
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
                    <h2 class="text-lg font-semibold text-center">Edit Jumlah Transaksi</h2>
                    <form @submit.prevent="updateJumlah()">
                        <div class="mb-4">
                            <label for="" class="block text-sm font-medium">Kode Transaksi</label>
                            <input type="text" v-model="selectedDetail.kode_transaksi"
                                class="border rounded-lg px-4 py-2 w-full" disabled>
                            <label for="" class="block text-sm font-medium">Metode Bayar</label>
                            <select v-model="selectedDetail.metode_bayar" class="border rounded-lg px-4 py-2 w-full">
                                <option value="CASH">CASH</option>
                                <option value="DEBIT">DEBIT</option>
                                <option value="QRIS">QRIS</option>
                                <option value="TRANSFER">TRANSFER</option>
                            </select>
                            <!-- <input type="text" v-model="selectedDetail.metode_bayar"
                                class="border rounded-lg px-4 py-2 w-full" disabled> -->

                            <label for="" class="block text-sm font-medium">Pelanggan: </label>
                            <div v-if="selectedDetail.pelanggan">
                                <input type="text" v-model="selectedDetail.pelanggan.nama"
                                    class="border rounded-lg px-4 py-2 w-full" disabled>
                            </div>
                            <div v-else>
                                <h1 class="border rounded-lg px-4 py-2 w-full">Pelanggan Tidak tersedia</h1>
                            </div>


                            <div v-for="listCheckout in selectedDetail.obats" :key="listCheckout.id_obat">
                                <label for="" class="block text-sm font-medium">Nama Obat</label>
                                <input type="text" v-model="listCheckout.obat.nama_obat"
                                    class="border rounded-lg px-4 py-2 w-full" disabled>
                                <label for="" class="block text-sm font-medium">Jumlah Transaksi</label>
                                <input type="number" v-model="listCheckout.jumlah"
                                    class="border rounded-lg px-4 py-2 w-full">
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit"
                                class="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showModal"
            class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <!-- Close Button -->
                <button @click="closeModal" class="absolute top-4 right-4 hover:scale-110 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"
                        class="hover:fill-red-600">
                        <path
                            d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                </button>

                <!-- Detail Obat -->
                <div v-if="detailsObat" class="px-6 pt-10">
                    <h2 class="text-lg font-semibold text-center mb-4">Detail Obat</h2>
                    <div class="border-b mb-4"></div>
                    <div class="space-y-6">
                        <table v-for="(listCheckout) in selectedDetail.obats" :key="listCheckout.id_obat"
                            class="w-full">
                            <tbody>
                                <tr>
                                    <th class="text-left w-1/4 py-2">Kode Obat</th>
                                    <td>{{ listCheckout.obat.kode_obat }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left py-2">Nama Obat</th>
                                    <td>{{ listCheckout.obat.nama_obat }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left py-2">Dosis</th>
                                    <td>{{ listCheckout.obat.dosis_obat }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left py-2 align-top">Tag</th>
                                    <td>
                                        <div class="flex flex-wrap">
                                            <span v-for="(tag, index) in listCheckout.obat.tags" :key="index"
                                                class="bg-gray-200 text-black px-2 py-1 rounded-lg m-1">
                                                {{ tag.nama_tag }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="text-left py-2 mb-4">Harga Obat</th>
                                    <td>{{ formattedRupiah(listCheckout.obat.harga_jual) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Detail Stok -->
                <div v-if="detailsStok" class="px-6 pt-10">
                    <h2 class="text-lg font-semibold text-center mb-4">Detail Stok</h2>
                    <div class="border-b mb-4"></div>
                    <table class="w-full max-w-xl mx-auto">
                        <tbody>
                            <tr>
                                <th class="text-left w-1/3 py-2">Tipe Transaksi</th>
                                <td>{{ selectedDetail.tipeTransaksi }}</td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">Stok Awal</th>
                                <td>{{ selectedDetail.stokAwal }}</td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">Jumlah</th>
                                <td>{{ selectedDetail.jumlahTransaksi }}</td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">Stok Akhir</th>
                                <td>{{ selectedDetail.stokAkhir }}</td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">Tanggal</th>
                                <td>{{ selectedDetail.tgl.split('T')[0] }}</td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">Waktu</th>
                                <td>{{ selectedDetail.tgl.split('T')[1].split("-")[0] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Navigation -->
                <!-- <div class="flex justify-end gap-4 pt-6 px-7 pb-10">
                    <button @click="prev"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md">Prev</button>
                    <button @click="next"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md">Next</button>
                </div> -->
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
            if (transaksi.status === "SUCCESS") {
                alert("Update Transaksi hanya bisa Dilakukan saat status CANCEL ATAU PENDING")
                return
            }
            console.log(transaksi)
            // Mapping array obat dari transaksi untuk mendapatkan detail
            this.selectedDetail = transaksi

            console.log("Selected details:", this.selectedDetail);
            this.showModals = true;

        }
        ,
        updateJumlah() {
            // Validasi input
            if (!this.selectedDetail) {
                alert("Jumlah transaksi harus lebih dari 0.");
                return;
            }
            // Map data untuk setiap obat dalam selectedDetail.obats
            const obats = this.selectedDetail.obats.map(({ id_obat, jumlah, harga }) => ({
                id_obat: id_obat,
                jumlah: jumlah,
                harga: harga
            }));

            const updatedData = {
                kode_transaksi: this.selectedDetail.kode_transaksi,
                id_pelanggan: this.selectedDetail.id_pelanggan,
                handled_by: this.selectedDetail.handled_by,
                metode_bayar: this.selectedDetail.metode_bayar,
                status: "PENDING",
                diskon: this.selectedDetail.diskon,
                gambar: "",
                obats: obats
            };

            console.log("Updated data:", updatedData);
            //     console.log(this.selectedDetail[0].id_transaksi)
            const id = this.selectedDetail.id_transaksi
            //     // Panggil API untuk memperbarui data
            Api.updateTransaksi(id, updatedData)
                .then(() => {
                    // Berikan notifikasi sukses
                    alert(`Jumlah transaksi ${id} berhasil diperbarui!`);
                    this.getTransaksi();
                    this.closeModal();
                })
                .catch((err) => {
                    // Tangani error dan tampilkan pesan error
                    console.error(err);
                    const errorMessage = err.response?.data?.error || "Terjadi kesalahan saat memperbarui jumlah transaksi.";
                    alert(`Gagal memperbarui jumlah transaksi ${id}. ${errorMessage}`);
                });
        }
        ,
        next() {
            this.detailsObat = false;
            this.detailsStok = true
        },
        prev() {
            this.detailsStok = false;
            this.detailsObat = true
        },
        deleteTransaksi(obat) {
            if (obat.status === "SUCCESS") {
                alert("Hapus Transaksi hanya Bisa Dilakukan dengan Status CANCEL atau PENDING")
                return
            }
            Api.deleteTransaksi(obat.id_transaksi)
                .then(() => {
                    alert(`Transaksi ${obat.id_transaksi} berhasil di hapus!!!`)
                    setTimeout(() => {
                        window.location.reload()
                    }, 200);
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        showDetail(transaksi) {
            console.log(transaksi);
            // const transaksi = this.dataTransaksi.find(t => t.id_transaksi === id);
            if (transaksi && transaksi.obats.length > 0) {
                this.selectedDetail = transaksi;
                //     const obatDetail = transaksi.obats[0].obat;
                //     const stokTerbaru = obatDetail.stok.find(
                //         stok => stok.created_at === transaksi.created_at
                //     );
                //     console.log(transaksi)
                //     this.selectedDetail = {
                //         kode_obat: obatDetail.kode_obat,
                //         nama_obat: obatDetail.nama_obat,
                //         dosis: obatDetail.dosis_obat,
                //         tag: obatDetail.tags.map(tag => tag.nama_tag).join(', '),
                //         harga_obat: transaksi.obats[0].harga,
                //         jumlahTransaksi: transaksi.obats[0].jumlah,
                //         stokAwal: stokTerbaru?.stok_awal || "-",
                //         stokAkhir: stokTerbaru?.stok_akhir || "-",
                //         tipeTransaksi: stokTerbaru?.tipe_transaksi || "-",
                //         tgl: transaksi.created_at
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
        resetFilter() {
            this.filterDate = "";
            this.filteredTransaksi = this.transaksis;
        },
    },
    mounted() {
        this.getTransaksi()
    }
};
</script>
