<template>
    <div class="bg-emerald-600 font-Roboto text-white shadow-md">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-5">
  
        <!-- Kiri: Logo & Navigasi -->
        <div class="flex items-center space-x-6">
          <!-- Logo -->
          <div class="shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#E2DFD0" viewBox="0 0 24 24" stroke-width="3.5" stroke="#E2DFD0" class="w-8 h-8">
              <path stroke-linecap="none" stroke-linejoin="none" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
  
          <!-- Menu -->
          <nav class="flex space-x-2">
            <div
              v-for="menu in menus"
              :key="menu.id"
              @click="setActiveMenu(menu.path)"
              class="relative group">
              <span
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  activeMenu === menu.path
                    ? 'bg-white text-emerald-600 shadow'
                    : 'hover:bg-emerald-500 hover:text-emerald-200'
                ]"
                >
                {{ menu.nama }}
              </span>
              <div v-if="activeMenu === menu.path" class="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded"></div>
            </div>
          </nav>
        </div>
  
        <!-- Kanan: Logout -->
        <div @click="logout" class="flex items-center space-x-1 text-sm cursor-pointer hover:text-red-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M18 12h.008v.008H18v-.008ZM15.75 12H21m0 0-3-3m3 3-3 3" />
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
