<template>
    <div class="container mx-auto p-6">

        <!-- Tab Navigation -->
        <div class="flex justify-start space-x-4 mb-6 text-white">
            <button v-for="(tab, index) in tabs" :key="index"
                :class="['px-4 py-2 rounded-lg', currentTab === tab ? 'bg-emerald-600 text-white border border-black' : 'bg-emerald-600 hover:bg-emerald-800']"
                @click="currentTab = tab">
                {{ tab }}
            </button>
        </div>

        <!-- Tab Content -->
        <div v-if="currentTab === 'Laporan Transaksi'" class="overflow-x-auto font-Roboto pt-2 rounded-lg shadow">
            <table class="min-w-full bg-white border border-gray-200 text-sm">
                <thead class="bg-emerald-600 text-white">
                    <tr>
                        <th class="px-4 py-2 text-left border">No</th>
                        <th class="px-4 py-2 text-left border">Kode Transaksi</th>
                        <th class="px-4 py-2 text-left border">Tanggal</th>
                        <th class="px-4 py-2 text-left border">Jam</th>
                        <th class="px-4 py-2 text-left border">Obat</th>
                        <th class="px-4 py-2 text-left border">Jumlah</th>
                        <th class="px-4 py-2 text-left border">Harga Satuan</th>
                        <th class="px-4 py-2 text-left border">Total Harga</th>
                        <th class="px-4 py-2 text-left border">Jenis Transaksi</th>
                        <th class="px-4 py-2 text-left border">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(trx, index) in laporanTransaksi" :key="index" class="hover:bg-gray-50">
                        <td class="px-4 py-2 border">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border">{{ trx['Kode Transaksi'] }}</td>
                        <td class="px-4 py-2 border">{{ formatDate(trx.Tanggal) }}</td>
                        <td class="px-4 py-2 border">{{ formatTime(trx.Tanggal) }}</td>
                        <td class="px-4 py-2 border">{{ trx.Obat }}</td>
                        <td class="px-4 py-2 border">{{ trx.Jumlah }}</td>
                        <td class="px-4 py-2 border">{{ trx['Harga Satuan'] }}</td>
                        <td class="px-4 py-2 border">{{ trx['Total Harga'] }}</td>
                        <td class="px-4 py-2 border">{{ trx['Jenis Transaksi'] }}</td>
                        <td class="px-4 py-2 border">{{ trx.Keterangan }}</td>
                    </tr>
                </tbody>
            </table>
        </div>



        <!--tab content2-->

        <div v-if="currentTab === 'Laporan Stok'" class="overflow-x-auto font-Roboto pt-2 rounded-lg shadow">
            <table class="min-w-full bg-white border border-gray-200 text-sm">
                <thead class="bg-emerald-600 text-white">
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


        <div v-if="currentTab === 'Laporan Laba/Rugi'" class="overflow-x-auto font-Roboto pt-2 rounded-lg shadow">
            <table class="min-w-full bg-white border border-gray-200 text-sm">
                <thead class="bg-emerald-600 text-white">
                    <tr>
                        <th class="px-4 py-2 text-left border">Periode</th>
                        <th class="px-4 py-2 text-left border">Pendapatan</th>
                        <th class="px-4 py-2 text-left border">Pengeluaran</th>
                        <th class="px-4 py-2 text-left border">Laba Bersih</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50">
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