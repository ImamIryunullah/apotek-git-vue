<template>
    <div class="font-Roboto">
        <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
            <h1 class="text-xl font-semibold text-gray-800">Manajemen Pelanggan</h1>
            <button @click="openModalCreate"
                class="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition duration-150 ease-in-out">
                Tambah Pelanggan
            </button>
        </div>

        <div class="p-4">
            <table class="min-w-full border border-gray-200 bg-white text-sm font-Roboto">
                <thead class="bg-emerald-600 text-white">
                    <tr>
                        <th class="px-4 py-2 border">ID</th>
                        <th class="px-4 py-2 border">Nama</th>
                        <th class="px-4 py-2 border">Alamat</th>
                        <th class="px-4 py-2 border">Telepon</th>
                        <th class="px-4 py-2 border">Email</th>
                        <th class="px-4 py-2 border text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pelanggan in pelanggan" :key="pelanggan.id" class="hover:bg-gray-100">
                        <td class="px-4 py-2 border">{{ pelanggan.id_pelanggan }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.nama }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.alamat }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.telepon }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.email }}</td>
                        <td class="px-4 py-2 border">
                            <div class="flex flex-wrap gap-2 justify-center">
                                <button @click="openModalshow(pelanggan)"
                                    class="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                                    <i class="fas fa-eye"></i> Tampil
                                </button>
                                <button @click="openModalEdit(pelanggan)"
                                    class="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button @click="deletepelanggan(pelanggan.id_pelanggan)"
                                    class="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                    <i class="fas fa-trash-alt"></i> Hapus
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Tambah/Edit -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div class="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md">

                <!-- Tombol Close -->
                <button @click="isModalOpen = false"
                    class="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        viewBox="0 0 256 256">
                        <path
                            d="M208,48a8,8,0,0,0-11.31,0L128,116.69,59.31,48A8,8,0,0,0,48,59.31L116.69,128,48,196.69A8,8,0,0,0,59.31,208L128,139.31,196.69,208A8,8,0,0,0,208,196.69L139.31,128,208,59.31A8,8,0,0,0,208,48Z" />
                    </svg>
                </button>
                <h2 class="text-xl font-bold mb-6 text-center">
                    {{ isEditing ? 'Edit' : 'Tambah' }} Pelanggan
                </h2>
                <form @submit.prevent="isEditing ? UpdatePelanggan() : CreatePelanggan()" class="space-y-4">
                    <div>
                        <label for="nama" class="block text-sm font-medium">Nama:</label>
                        <input v-model="form.nama" type="text" id="nama"
                            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required />
                    </div>
                    <div>
                        <label for="alamat" class="block text-sm font-medium">Alamat:</label>
                        <input v-model="form.alamat" type="text" id="alamat"
                            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required />
                    </div>
                    <div>
                        <label for="telepon" class="block text-sm font-medium">Telepon:</label>
                        <input v-model="form.telepon" type="text" id="telepon"
                            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium">Email:</label>
                        <input v-model="form.email" type="email" id="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required />
                    </div>
                    <div class="flex justify-end pt-2">
                        <button type="submit"
                            class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="isModalShow" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-10 rounded-lg shadow-lg w-auto max-w-5xl">
                <h2 class="text-lg font-bold mb-4">Data pelanggan</h2>
                <div class="mb-4">
                    <label for="nama" class="block text-sm font-medium">Nama:</label>
                    <div class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200">{{ form.nama }}</div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Alamat:</label>
                    <div class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200">{{ form.alamat }}</div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Email:</label>
                    <div class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200">{{ form.email }}</div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">No Telpon:</label>
                    <div class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200">{{ form.telepon }}</div>
                </div>
                <div>
                    <div class="py-1 font-extrabold text-justify">
                        <h1>Daftar Transaksi</h1>
                    </div>
                    <div class="max-h-80 overflow-y-auto border rounded-lg">
                        <table class="w-full border-collapse">
                            <thead class="bg-gray-200 text-center sticky top-0">
                                <tr>
                                    <th class="text-center px-4 py-2 border">ID</th>
                                    <th class="text-center px-4 py-2 border">Kode Transaki</th>
                                    <th class="text-center px-4 py-2 border">Bukti Transaki</th>
                                    <th class="text-center px-4 py-2 border">Metode Bayar</th>
                                    <th class="text-center px-4 py-2 border">Status Transaksi</th>
                                    <th class="text-center px-4 py-2 border">Diskon</th>
                                    <th class="text-center px-4 py-2 border">Total Harga</th>
                                    <th class="text-center px-4 py-2 border">Tanggal Transaksi</th>
                                    <th class="text-center px-4 py-2 border">Jam Transaksi</th>
                                    <th class="text-center px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="transaksi in TransaksiPelanggan" :key="transaksi.id_transaksi"
                                    class="hover:bg-gray-100">
                                    <td class="text-center px-4 py-2 border">{{ transaksi.id_transaksi }}</td>
                                    <td class="text-center px-4 py-2 border">{{ transaksi.kode_transaksi }}</td>
                                    <td class="text-center px-4 py-2 border">
                                        <div v-if="transaksi.bukti_pembayaran">
                                            <img :src="getFullImgPath(transaksi.bukti_pembayaran)"
                                                alt="{{ transaksi.nama }}" class="w-16 h-16 object-cover rounded" />
                                        </div>
                                        <div v-else>
                                            Bukti Transaksi Kosong
                                        </div>
                                    </td>
                                    <td class="text-center px-4 py-2 border">{{ transaksi.metode_bayar }}</td>
                                    <td class="text-center px-4 py-2 border">{{ transaksi.status }}</td>
                                    <td class="text-center px-4 py-2 border">{{ transaksi.diskon }}</td>
                                    <td class="text-center px-4 py-2 border">{{ transaksi.total_harga }}</td>
                                    <td class="text-center px-4 py-2 border">{{
                                        transaksi.created_at.split('T')[0] }}</td>
                                    <td class="text-center px-4 py-2 border">{{
                                        transaksi.created_at.split('T')[1].split('.')[0] }}</td>
                                    <td class="text-center px-4 py-2 border">
                                        <div class="py-4 text-right">

                                            <button @click="showDetailObat(transaksi.obats)"
                                                class="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                                                <i class="fas fa-circle-info"></i>
                                                Detail
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="py-4 text-right">
                    <button @click="closeModal"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
        <div v-if="isShowModalObat" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <h2 class="text-xl font-bold mb-4 text-center text-emerald-700">Data Pelanggan</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="text-sm font-medium">Nama</label>
                        <div class="p-2 border rounded">{{ form.nama }}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Email</label>
                        <div class="p-2 border rounded">{{ form.email }}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Alamat</label>
                        <div class="p-2 border rounded">{{ form.alamat }}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium">No Telepon</label>
                        <div class="p-2 border rounded">{{ form.telepon }}</div>
                    </div>
                </div>

                <h3 class="text-lg font-semibold mb-2 text-emerald-700">Daftar Obat Dibeli</h3>
                <div class="overflow-x-auto border rounded-lg max-h-80 overflow-y-auto">
                    <table class="min-w-full text-sm text-center">
                        <thead class="bg-gray-100 sticky top-0">
                            <tr>
                                <th class="px-2 py-2 border">ID</th>
                                <th class="px-2 py-2 border">Nama</th>
                                <th class="px-2 py-2 border">Kode</th>
                                <th class="px-2 py-2 border">Gambar</th>
                                <th class="px-2 py-2 border">Tag</th>
                                <th class="px-2 py-2 border">Tipe</th>
                                <th class="px-2 py-2 border">Dosis</th>
                                <th class="px-2 py-2 border">Golongan</th>
                                <th class="px-2 py-2 border">Merk</th>
                                <th class="px-2 py-2 border">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="obat in selectedObat" :key="obat.id_obat" class="hover:bg-gray-50">
                                <td class="px-2 py-2 border">{{ obat.obat.id_obat }}</td>
                                <td class="px-2 py-2 border">{{ obat.obat.nama_obat }}</td>
                                <td class="px-2 py-2 border">{{ obat.obat.kode_obat }}</td>
                                <td class="px-2 py-2 border">
                                    <img :src="getFullImgPath(obat.obat.gambar_obat)"
                                        class="w-12 h-12 object-cover rounded" />
                                </td>
                                <td class="px-2 py-2 border">
                                    <span v-for="(tag, index) in obat.obat.tags" :key="index">
                                        {{ tag.nama_tag }}<span v-if="index < obat.obat.tags.length - 1">, </span>
                                    </span>
                                </td>
                                <td class="px-2 py-2 border">{{ obat.obat.tipe_obat.nama_tipe }}</td>
                                <td class="px-2 py-2 border">{{ obat.obat.dosis_obat }}</td>
                                <td class="px-2 py-2 border">{{ obat.obat.golongan_obat }}</td>
                                <td class="px-2 py-2 border">{{ obat.obat.merk_obat }}</td>
                                <td class="px-2 py-2 border">{{ obat.jumlah }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-6 text-right">
                    <button @click="closeModalObat"
                        class="px-5 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                        Tutup
                    </button>
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
            pelanggan: [],
            TransaksiPelanggan: [],
            isModalOpen: false,
            isModalShow: false,
            isEditing: false,
            isShowModalObat: false,
            selectedObat: [],
            form: {
                id: null,
                nama: '',
                alamat: '',
                telepon: '',
                email: ''
            }
        };
    },
    methods: {
        closeModalObat() {
            this.isShowModalObat = false;
            this.selectedObat = null
            this.isModalShow = true
        },
        showDetailObat(obat) {
            this.selectedObat = obat;
            this.isShowModalObat = true;
            this.isModalShow = false
        },
        fetchpelanggan() {
            Api
                .getAllPelanggan()
                .then((response) => {
                    this.pelanggan = response.data.data;
                    // console.log(this.pelanggan)
                })
                .catch((error) => {
                    console.error('Error fetching pelanggan:', error);
                });
        },
        CreatePelanggan() {
            Api
                .createPelanggan(this.form)
                .then(() => {
                    alert('pelanggan berhasil ditambahkan!');
                    this.fetchpelanggan();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error('Error creating pelanggan:', error);
                });
        },
        UpdatePelanggan() {
            Api
                .updatePelanggan(this.form.id_pelanggan, this.form)
                .then(() => {
                    alert('pelanggan berhasil diperbarui!');
                    this.fetchpelanggan();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error('Error updating pelanggan:', error);
                });
        },
        deletepelanggan(id) {
            if (confirm(`Apakah Anda yakin ingin menghapus pelanggan ini? ${id}`)) {
                Api
                    .deletePelanggan(id)
                    .then(() => {
                        alert('pelanggan berhasil dihapus!');
                        this.fetchpelanggan();
                    })
                    .catch((error) => {
                        console.error('Error deleting pelanggan:', error);
                    });
            }
        },
        openModalshow(pelanggan) {
            this.form = pelanggan;
            this.TransaksiPelanggan = pelanggan.transaksi;
            console.log(this.TransaksiPelanggan)
            this.isModalShow = true;
        },
        openModalCreate() {
            this.resetForm();
            this.isEditing = false;
            this.isModalOpen = true;
        },
        openModalEdit(pelanggan) {
            this.form = { ...pelanggan };
            this.isEditing = true;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isModalShow = false;
            this.resetForm();
        },
        getFullImgPath(img) {
            return Api.getFullImgPath(img)
        },
        resetForm() {
            this.form = {
                id: null,
                nama: '',
                alamat: '',
                telepon: '',
                email: ''
            };
        }
    },
    mounted() {
        this.fetchpelanggan();
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 8px;
}
</style>