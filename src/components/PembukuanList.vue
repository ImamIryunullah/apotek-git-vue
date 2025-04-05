<template>
    <div class="container mx-auto p-6">

        <!-- Tab Navigation -->
        <div class="flex justify-start space-x-4 mb-6">
            <button v-for="(tab, index) in tabs" :key="index"
                :class="['px-4 py-2 rounded-lg', currentTab === tab ? 'bg-emerald-500 text-white border border-black' : 'bg-emerald-300 hover:bg-emerald-500']"
                @click="currentTab = tab">
                {{ tab }}
            </button>
        </div>

        <!-- Tab Content -->
        <div v-if="currentTab === 'Laporan Transaksi'" class="overflow-x-auto font-Roboto pt-6">
            <h2 class="text-xl font-semibold mb-4 px-4">Laporan Transaksi</h2>
            <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg text-sm">
                <thead class="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                        <th class="px-6 py-3 text-left border-b">No</th>
                        <th class="px-6 py-3 text-left border-b">Kode Transaksi</th>
                        <th class="px-6 py-3 text-left border-b">Tanggal</th>
                        <th class="px-6 py-3 text-left border-b">Jam</th>
                        <th class="px-6 py-3 text-left border-b">Obat</th>
                        <th class="px-6 py-3 text-left border-b">Jumlah</th>
                        <th class="px-6 py-3 text-left border-b">Harga Satuan</th>
                        <th class="px-6 py-3 text-left border-b">Total Harga</th>
                        <th class="px-6 py-3 text-left border-b">Jenis Transaksi</th>
                        <th class="px-6 py-3 text-left border-b">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(trx, index) in laporanTransaksi" :key="index"
                        class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-3 border-b">{{ index + 1 }}</td>
                        <td class="px-6 py-3 border-b">{{ trx['Kode Transaksi'] }}</td>
                        <td class="px-6 py-3 border-b">{{ formatDate(trx.Tanggal) }}</td>
                        <td class="px-6 py-3 border-b">{{ formatTime(trx.Tanggal) }}</td>
                        <td class="px-6 py-3 border-b">{{ trx.Obat }}</td>
                        <td class="px-6 py-3 border-b">{{ trx.Jumlah }}</td>
                        <td class="px-6 py-3 border-b">{{ trx['Harga Satuan'] }}</td>
                        <td class="px-6 py-3 border-b">{{ trx['Total Harga'] }}</td>
                        <td class="px-6 py-3 border-b">{{ trx['Jenis Transaksi'] }}</td>
                        <td class="px-6 py-3 border-b">{{ trx.Keterangan }}</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div v-if="currentTab === 'Laporan Stok'" class="overflow-x-auto">
            <h2 class="text-xl font-semibold mb-4">Laporan Stok</h2>
            <table class="min-w-full bg-white border border-gray-200">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left border">No</th>
                        <th class="px-4 py-2 text-left border">Obat</th>
                        <th class="px-4 py-2 text-left border">Tipe Transaksi</th>
                        <th class="px-4 py-2 text-left border">Stok Awal</th>
                        <th class="px-4 py-2 text-left border">Jumlah Transaksi</th>
                        <th class="px-4 py-2 text-left border">Stok Akhir</th>
                        <th class="px-4 py-2 text-left border">Keterangan</th>
                        <th class="px-4 py-2 text-left border">Tanggal</th>
                        <th class="px-4 py-2 text-left border">Jam</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stok, index) in laporanStok" :key="index" class="hover:bg-gray-50">
                        <td class="px-4 py-2 border">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border">{{ stok.Obat }}</td>
                        <td class="px-4 py-2 border">{{ stok['Tipe Transaksi'] }}</td>
                        <td class="px-4 py-2 border">{{ stok['Stok Awal'] }}</td>
                        <td class="px-4 py-2 border">{{ stok['Jumlah Transaksi'] }}</td>
                        <td class="px-4 py-2 border">{{ stok['Stok Akhir'] }}</td>
                        <td class="px-4 py-2 border">{{ stok.Keterangan }}</td>
                        <td class="px-4 py-2 border">{{ formatDate(stok.Tanggal) }}</td>
                        <td class="px-4 py-2 border">{{ formatTime(stok.Tanggal) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="currentTab === 'Laporan Laba/Rugi'" class="overflow-x-auto">
            <h2 class="text-xl font-semibold mb-4">Laporan Laba/Rugi</h2>
            <table class="min-w-full bg-white border border-gray-200">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left border">Periode</th>
                        <th class="px-4 py-2 text-left border">Pendapatan</th>
                        <th class="px-4 py-2 text-left border">Pengeluaran</th>
                        <th class="px-4 py-2 text-left border">Laba Bersih</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-2 border">{{ laporanLabaRugi.periode }}</td>
                        <td class="px-4 py-2 border">{{ laporanLabaRugi.pendapatan }}</td>
                        <td class="px-4 py-2 border">{{ laporanLabaRugi.pengeluaran }}</td>
                        <td class="px-4 py-2 border">{{ laporanLabaRugi.laba_bersih }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Api from "@/services/Api";

export default {
    data() {
        return {
            tabs: ["Laporan Transaksi", "Laporan Stok", "Laporan Laba/Rugi"],
            currentTab: "Laporan Transaksi", // Default tab
            laporanTransaksi: [],
            laporanStok: [],
            laporanLabaRugi: {},
        };
    },
    methods: {
        formatDate(datetime) {
            const date = new Date(datetime);
            return date.toISOString().split("T")[0];
        },
        formatTime(datetime) {
            const date = new Date(datetime);
            return date.toTimeString().split(" ")[0];
        },
        async fetchLaporanTransaksi() {
            try {
                const res = await Api.getLaporanTransaksi();
                this.laporanTransaksi = res.data;
            } catch (err) {
                console.error("Failed to fetch laporan transaksi:", err);
            }
        },
        async fetchLaporanStok() {
            try {
                const res = await Api.getLaporanStok();
                this.laporanStok = res.data;
            } catch (err) {
                console.error("Failed to fetch laporan stok:", err);
            }
        },
        async fetchLaporanLabaRugi() {
            try {
                const res = await Api.getLaporanLaba();
                this.laporanLabaRugi = res.data;
            } catch (err) {
                console.error("Failed to fetch laporan laba/rugi:", err);
            }
        },
    },
    mounted() {
        this.fetchLaporanTransaksi();
        this.fetchLaporanStok();
        this.fetchLaporanLabaRugi();
    },
};
</script>

<style>
/* Tailwind CSS handles styling */
</style>