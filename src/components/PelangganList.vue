<template>
    <div class="font-Roboto">
        <div class="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <h1 class="text-lg font-bold">Manajemen Pelanggan</h1>
            <button @click="openModalCreate"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Tambah Pelanggan
            </button>
        </div>

        <!-- Tabel pelanggan -->
        <div class="p-4">
            <table class="min-w-full border border-gray-200 bg-white">
                <thead class="bg-white border border-black">
                    <tr>
                        <th class="text-left px-4 py-2 border">ID</th>
                        <th class="text-left px-4 py-2 border">Nama</th>
                        <th class="text-left px-4 py-2 border">Alamat</th>
                        <th class="text-left px-4 py-2 border">Telepon</th>
                        <th class="text-left px-4 py-2 border">Email</th>
                        <th class="text-left px-4 py-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pelanggan in pelanggan" :key="pelanggan.id" class="hover:bg-gray-100">
                        <td class="px-4 py-2 border">{{ pelanggan.id_pelanggan }}</td>
                        <td class=" px-4 py-2 border">{{ pelanggan.nama }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.alamat }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.telepon }}</td>
                        <td class="px-4 py-2 border">{{ pelanggan.email }}</td>

                        <td class="px-4 py-2 border flex space-x-2">
                            <button @click="openModalshow(pelanggan)"
                                class="px-2 py-1 bg-emerald-500 text-white rounded hover:bg-blue-600">
                                Tampilkan
                            </button>
                            <button @click="openModalEdit(pelanggan)"
                                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Edit
                            </button>
                            <button @click="deletepelanggan(pelanggan.id_pelanggan)"
                                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                Hapus
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Tambah/Edit -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit' : 'Tambah' }} Pelanggan</h2>
                <form @submit.prevent="isEditing ? UpdatePelanggan() : CreatePelanggan()">
                    <div class="mb-4">
                        <label for="nama" class="block text-sm font-medium">Nama:</label>
                        <input v-model="form.nama" type="text" id="nama"
                            class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Alamat:</label>
                        <input type="text" id="alamat" v-model="form.alamat"
                            class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Telpon:</label>
                        <input type="text" id="alamat" v-model="form.telepon"
                            class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Email:</label>
                        <input type="text" id="alamat" v-model="form.email"
                            class="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200" required>
                    </div>
                    <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                        Simpan
                    </button>
                </form>
            </div>
        </div>

        <!-- Modal Show Data Transaksi -->
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
                                    <th class="text-center px-4 py-2 border">ID transaksi</th>
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
                                                class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                                                Detail Obat
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

        <!-- Show Modal Obat -->
        <div v-if="isShowModalObat" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
                        <h1>Daftar Obat Yang Di beli</h1>
                    </div>
                    <div class="max-h-80 overflow-y-auto border rounded-lg">
                        <table class="w-full border-collapse">
                            <thead class="bg-gray-200 text-center sticky top-0">
                                <tr>
                                    <th class="text-center px-4 py-2 border">ID Obat</th>
                                    <th class="text-center px-4 py-2 border">Nama Obat</th>
                                    <th class="text-center px-4 py-2 border">Kode Obat</th>
                                    <th class="text-center px-4 py-2 border">Gambar</th>
                                    <th class="text-center px-4 py-2 border">Tag Obat</th>
                                    <th class="text-center px-4 py-2 border">Tipe Obat</th>
                                    <th class="text-center px-4 py-2 border">Dosis Obat</th>
                                    <th class="text-center px-4 py-2 border">Golongan Obat</th>
                                    <th class="text-center px-4 py-2 border">Merk Obat</th>
                                    <th class="text-center px-4 py-2 border">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="obat in selectedObat" :key="obat.id_obat" class="hover:bg-gray-100">
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.id_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.nama_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.kode_obat }}</td>
                                    <td class="text-center px-4 py-2 border">
                                        <img :src="getFullImgPath(obat.obat.gambar_obat)" alt="{{ obat.nama }}"
                                            class="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td class="text-center px-4 py-2 border">
                                        <span v-for="(tag, index) in obat.obat.tags" :key="index">
                                            {{ tag.nama_tag }}<span v-if="index < obat.obat.tags.length - 1">, </span>
                                        </span>
                                    </td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.tipe_obat.nama_tipe }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.dosis_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.golongan_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.obat.merk_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.jumlah }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="py-4 text-right">
                    <button @click="closeModalObat"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
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