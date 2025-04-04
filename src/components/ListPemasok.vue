<template>
    <div class="font-Roboto">
        <div class="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <h1 class="text-lg font-bold">Manajemen Pemasok</h1>
            <button @click="openModalCreate"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Tambah Pemasok
            </button>
        </div>

        <!-- Tabel Pemasok -->
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
                    <tr v-for="pemasok in pemasoks" :key="pemasok.id" class="hover:bg-gray-100">
                        <td class="px-4 py-2 border">{{ pemasok.id_pemasok }}</td>
                        <td class=" px-4 py-2 border">{{ pemasok.nama }}</td>
                        <td class="px-4 py-2 border">{{ pemasok.alamat }}</td>
                        <td class="px-4 py-2 border">{{ pemasok.telepon }}</td>
                        <td class="px-4 py-2 border">{{ pemasok.email }}</td>

                        <td class="px-4 py-2 border flex space-x-2">
                            <button @click="openModalshow(pemasok)"
                                class="px-2 py-1 bg-emerald-500 text-white rounded hover:bg-blue-600">
                                Tampilkan
                            </button>
                            <button @click="openModalEdit(pemasok)"
                                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Edit
                            </button>
                            <button @click="deletePemasok(pemasok.id_pemasok)"
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
                <h2 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit' : 'Tambah' }} Pemasok</h2>
                <form @submit.prevent="isEditing ? updatePemasok() : createPemasok()">
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

        <!-- Modal Show Data -->
        <div v-if="isModalShow" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-10 rounded-lg shadow-lg w-auto max-w-5xl">
                <h2 class="text-lg font-bold mb-4">Data Pemasok</h2>
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
                        <h1>Daftar Obat</h1>
                    </div>
                    <div class="max-h-80 overflow-y-auto border rounded-lg">
                        <table class="w-full border-collapse">
                            <thead class="bg-gray-200 text-center sticky top-0">
                                <tr>
                                    <th class="text-center px-4 py-2 border">ID Obat</th>
                                    <th class="text-center px-4 py-2 border">Nama Obat</th>
                                    <th class="text-center px-4 py-2 border">Gambar</th>
                                    <th class="text-center px-4 py-2 border">Tag Obat</th>
                                    <th class="text-center px-4 py-2 border">Tipe Obat</th>
                                    <th class="text-center px-4 py-2 border">Dosis Obat</th>
                                    <th class="text-center px-4 py-2 border">Harga Obat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="obat in obatPemasok" :key="obat.id_obat" class="hover:bg-gray-100">
                                    <td class="text-center px-4 py-2 border">{{ obat.id_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.nama_obat }}</td>
                                    <td class="text-center px-4 py-2 border">
                                        <img :src="getFullImgPath(obat.gambar_obat)" alt="{{ obat.nama }}"
                                            class="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td class="text-center px-4 py-2 border">
                                        <span v-for="(tag, index) in obat.tags" :key="index">
                                            {{ tag.nama_tag }}<span v-if="index < obat.tags.length - 1">, </span>
                                        </span>
                                    </td>
                                    <td class="text-center px-4 py-2 border">{{ obat.tipe_obat.nama_tipe }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.dosis_obat }}</td>
                                    <td class="text-center px-4 py-2 border">{{ obat.harga_beli }}</td>
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

    </div>
</template>

<script>
import api from '@/services/Api';

export default {
    data() {
        return {
            pemasoks: [],
            obatPemasok: [],
            isModalOpen: false,
            isModalShow: false,
            isEditing: false,
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
        fetchPemasoks() {
            api
                .getAllPemasok()
                .then((response) => {
                    this.pemasoks = response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching pemasoks:', error);
                });
        },
        createPemasok() {
            api
                .CreatePemasok(this.form)
                .then(() => {
                    alert('Pemasok berhasil ditambahkan!');
                    this.fetchPemasoks();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error('Error creating pemasok:', error);
                });
        },
        updatePemasok() {
            api
                .UpdatePemasok(this.form.id_pemasok, this.form)
                .then(() => {
                    alert('Pemasok berhasil diperbarui!');
                    this.fetchPemasoks();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error('Error updating pemasok:', error);
                });
        },
        deletePemasok(id) {
            if (confirm(`Apakah Anda yakin ingin menghapus pemasok ini? ${id}`)) {
                api
                    .deletePemasok(id)
                    .then(() => {
                        alert('Pemasok berhasil dihapus!');
                        this.fetchPemasoks();
                    })
                    .catch((error) => {
                        console.error('Error deleting pemasok:', error);
                    });
            }
        },
        openModalshow(pemasok) {
            this.form = pemasok;
            this.obatPemasok = pemasok.obats;
            this.isModalShow = true;
        },
        openModalCreate() {
            this.resetForm();
            this.isEditing = false;
            this.isModalOpen = true;
        },
        openModalEdit(pemasok) {
            this.form = { ...pemasok };
            this.isEditing = true;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isModalShow = false;
            this.resetForm();
        },
        getFullImgPath(img) {
            return api.getFullImgPath(img)
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
        this.fetchPemasoks();
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