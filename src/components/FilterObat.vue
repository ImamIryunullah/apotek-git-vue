<template>
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
                                        <h1>Kode Obat</h1>
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
                                            <h1>Jenis Obat</h1>
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
                        <div>
                            <div class="relative">
                                <div @click="dropdownJenisPenyakit"
                                    class="bg-white border border-black rounded-lg cursor-pointer w-52">
                                    <div class="flex justify-between items-center px-4">
                                        <button class="px-2 py-2">
                                            <h1>Jenis Penyakit</h1>
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
                                <div v-if="iSJenisPenyakit"
                                    class="absolute bg-white border border-black mt-2 rounded-lg shadow-lg w-52">
                                    <div class="flex flex-col divide-y divide-gray-200">
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>Flu</h1>
                                        </label>
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>Batuk</h1>
                                        </label>
                                        <label class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex space-x-2">
                                            <input type="checkbox">
                                            <h1>Demam</h1>
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
                    <input class="bg-gray-100 border-2 border-black pl-4 w-[30rem] h-[2.8rem] capitalize rounded-lg"
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
</template>

<script>
export default {
    data() {
        return {
            isJenisObatOpen: false,
            isKodeObatOpen: false,
            iSJenisPenyakit: false
        }
    },
    methods: {
        dropdownJenisObat() {
            this.isJenisObatOpen = !this.isJenisObatOpen;
        },
        dropdownKodeObat() {
            this.isKodeObatOpen = !this.isKodeObatOpen
        },
        dropdownJenisPenyakit() {
            this.iSJenisPenyakit = !this.iSJenisPenyakit
        }
    },
}
</script>
