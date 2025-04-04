<template>
    <div class="bg-emerald-600 font-Roboto text-white relative">
        <div class="flex justify-between items-center px-10 py-6">
            <!-- Menu Navigasi -->
            <div class="flex space-x-4 items-center">
                <div>
                    <h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E2DFD0" viewBox="0 0 24 24" stroke-width="4.5"
                            stroke="#E2DFD0" class="size-14">
                            <path stroke-linecap="none" stroke-linejoin="none" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </h1>
                </div>
                <div class="flex space-x-1">
                    <div v-for="menu in menus" :key="menu.id" class="relative group pb-[0.05rem]">
                        <h1 :class="[
                            'cursor-pointer px-5 py-6 text-lg font-semibold uppercase transition-all duration-300',
                            activeMenu === menu.path
                                ? 'bg-white text-emerald-600 rounded-t-lg shadow-md'
                                : 'hover:bg-emerald-500 hover:text-emerald-200 hover:rounded-t-lg font-bold',
                        ]" @click="setActiveMenu(menu.path)">
                            {{ menu.nama }}
                        </h1>
                        <div v-if="activeMenu === menu.path" class="absolute bottom-0 left-0 right-0 h-1 bg-white">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ikon Logout -->
            <div @click="logout" class="cursor-pointer flex items-center space-x-2 hover:text-red-500 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-9A2.25 2.25 0 0 0 2.25 5.25v13.5A2.25 2.25 0 0 0 4.5 21h9a2.25 2.25 0 0 0 2.25-2.25V15M18 12h.008v.008H18v-.008ZM15.75 12H21m0 0-3-3m3 3-3 3" />
                </svg>
                <span>Logout</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeMenu: "/",
            menus: [
                { id: 1, nama: "Dashboard", path: "/" },
                { id: 2, nama: "Verifikasi Transaksi", path: "/veriftransaksi" },
                { id: 3, nama: "Edit Transaksi", path: "/historitransaksi" },
                { id: 4, nama: "Stok Obat", path: "/stok" },
                { id: 5, nama: "Managemen Obat", path: "/management" },
                { id: 6, nama: "Pemasok", path: "/pemasok" },
                { id: 7, nama: "Pembukuan", path: "/pembukuan" },
                { id: 8, nama: "Pelanggan", path: "/pelanggan" },
            ],
        };
    },
    methods: {
        setActiveMenu(path) {
            this.activeMenu = path;
            this.$router.push(path);
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
    },
    watch: {
        $route(to) {
            this.activeMenu = to.path;
        },
    },
    mounted() {
        this.activeMenu = this.$route.path;
    },
};
</script>

<!-- <template>
    <div class="bg-emerald-600 font-Roboto text-white relative">
        <div class="flex space-x-4 pt-6 pb-0 px-10 items-center">
            <div>
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#E2DFD0" viewBox="0 0 24 24" stroke-width="4.5"
                        stroke="#E2DFD0" class="size-14">
                        <path stroke-linecap="none" stroke-linejoin="none" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </h1>
            </div>
            <div class="flex space-x-1">
                <div v-for="menu in menus" :key="menu.id" class="relative group pb-[0.05rem]">
                    <h1 :class="[
                        'cursor-pointer px-10 py-6 text-lg font-semibold uppercase transition-all duration-300',
                        activeMenu === menu.path
                            ? 'bg-white text-emerald-600 rounded-t-lg shadow-md'
                            : 'hover:bg-emerald-500 hover:text-emerald-200 hover:rounded-t-lg font-bold',
                    ]" @click="setActiveMenu(menu.path)">
                        {{ menu.nama }}
                    </h1>
                    <div v-if="activeMenu === menu.path" class="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeMenu: "/",
            menus: [
                { id: 1, nama: "Dashboard", path: "/" },
                { id: 2, nama: "Managemen Obat", path: "/management" },
                { id: 3, nama: "Stok Obat", path: "/stok" },
                { id: 4, nama: "Histori Transaksi", path: "/transaksi" },
                { id: 5, nama: "pemasok", path: "/pemasok" },
                { id: 6, nama: "Pembukuan", path: "/pembukuan" },
            ],
        };
    },
    methods: {
        setActiveMenu(path) {
            this.activeMenu = path;
            this.$router.push(path);
        },
    },
    watch: {
        $route(to) {
            this.activeMenu = to.path;
        },
    },
    mounted() {
        this.activeMenu = this.$route.path;
    },
};
</script> -->
