<template>
  <div class="font-Roboto tracking-wider px-4 py-6">
    <div class="flex pb-6">
      <div @click="openCreateModal" class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
        <button class="px-6 py-2 text-white font-bold">
          <h1>Tambah Obat</h1>
        </button>
      </div>
      <div @click="openCreateModalExcel"
        class="bg-emerald-600 ml-3 hover:bg-emerald-700 border border-black rounded-lg">
        <button class="px-6 py-2 text-white font-bold">
          <h1>Tambah Obat Excel</h1>
        </button>
      </div>
    </div>
    <div class="flex pb-2"></div>
    <div class="overflow-x-auto font-Roboto">
      <table class="min-w-full bg-white border border-gray-200 shadow-md text-base rounded-lg">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="pl-10 py-3 border-b border-gray-300">ID Obat</th>
            <th class="pl-10 py-3 border-b border-gray-300">Nama Obat</th>
            <th class="pl-10 py-3 border-b border-gray-300">Kode Obat</th>
            <th class="px-4 py-3 border-b border-gray-300">Gambar</th>
            <th class="px-4 py-3 border-b border-gray-300">Dosis</th>
            <th class="px-4 py-3 border-b border-gray-300">Deskripsi</th>
            <th class="px-4 py-3 border-b border-gray-300">Harga Beli</th>
            <th class="px-4 py-3 border-b border-gray-300">Harga Jual</th>
            <th class="px-4 py-3 border-b border-gray-300">Margin</th>
            <th class="px-4 py-3 border-b border-gray-300">Tag</th>
            <th class="px-4 py-3 border-b border-gray-300">Tipe Obat</th>
            <th class="px-4 py-3 border-b border-gray-300">Stok Akhir</th>
            <th class="pl-8 py-3 border-b border-gray-300">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obat in paginatedObats" :key="obat.id" class="hover:bg-gray-100">
            <td class="pl-10 py-4 border-b border-gray-300 font-bold">
              {{ obat.id_obat }}
            </td>
            <td class="pl-10 py-4 border-b border-gray-300 font-bold">
              {{ obat.nama_obat }}
            </td>
            <td class="pl-10 py-4 border-b border-gray-300 font-bold">
              {{ obat.kode_obat }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              <img :src="getFullImgPath(obat.gambar_obat)" alt="{{ obat.nama }}"
                class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              {{ obat.dosis_obat }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300 text-sm">
              {{ obat.deskripsi.split(" ").slice(0, 10).join(" ") + "..." }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              {{ formattedRupiah(obat.harga_beli) }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              {{ formattedRupiah(obat.harga_jual) }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              {{ formattedRupiah(obat.margin) }}
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              <span v-for="(tag, index) in obat.tags" :key="index">
                {{ tag.nama_tag }}
                <span v-if="index < obat.tags.length - 1">, </span>
                <!-- Menambahkan koma antara elemen -->
              </span>
            </td>
            <td class="px-4 py-4 border-b border-gray-300">
              {{ obat.tipe_obat.nama_tipe }}
            </td>
            <td v-if="obat.stok.length > 0" class="px-4 py-4 border-b border-gray-300">
              {{ obat.stok[obat.stok.length - 1].stok_akhir }}
            </td>
            <td v-else>Stok Belum Di Tambahkan</td>
            <td class="px-4 pb-4 border-b border-gray-300 flex items-center space-x-4 pt-10">
              <button @click="openEditModal(obat)">
                <div class="p-2 rounded hover:bg-gray-200 cursor-pointer relative -top-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </div>
              </button>
              <button @click="deleteObat(obat)">
                <div class="p-2 rounded hover:bg-gray-200 cursor-pointer relative -top-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
  </div>
  <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg pt-10 pb-16 w-[30rem]">
      <div class="-mt-6 pb-4">
        <div class="flex justify-end pr-6 pt-2">
          <button @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"
              class="hover:fill-red-600">
              <path
                d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
              </path>
            </svg>
          </button>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-center">Edit Obat</h2>
        </div>
      </div>
      <div class="border-b-2"></div>
      <form @submit.prevent="updateObat" class="pt-4 max-h-[750px] overflow-y-auto">
        <table class="flex justify-center">
          <tbody>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Nama Obat</th>
              <td>
                <input v-model="selectedObat.nama_obat" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Kode Obat</th>
              <td>
                <label class="w-full pr-20 py-2 pl-2 margin border border-gray-300 rounded"> {{
                  generateKodeObat(selectedObat.nama_obat) }}</label>
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Dosis</th>
              <td>
                <input v-model="selectedObat.dosis_obat" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Golongan Obat</th>
              <td>
                <input v-model="selectedObat.golongan_obat" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Merk Obat</th>
              <td>
                <input v-model="selectedObat.merk_obat" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Resep Dokter</th>
              <td>
                <select v-model="selectedObat.is_prescription" class="w-full py-2 pl-2 border border-gray-300 rounded">
                  <option :value="true">Ya</option>
                  <option :value="false">Tidak</option>
                </select>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Pemasok</th>
              <td>
                <select v-model="selectedObat.id_pemasok" class="w-full p-2 border border-gray-300 rounded" required>
                  <option v-for="pemasok in pemasoks" :key="pemasok.id_pemasok" :value="pemasok.id_pemasok">
                    {{ pemasok.nama }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Deskripsi</th>
              <td>
                <textarea v-model="selectedObat.deskripsi"
                  class="w-full h-[5.5rem] pl-2 border border-gray-300 rounded"></textarea>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Tipe Obat</th>
              <td>
                <select v-model="selectedObat.id_tipe_obat" class="w-full p-2 border border-gray-300 rounded" required>
                  <option v-for="tipe in tipeObats" :key="tipe.id_tipe_obat" :value="tipe.id_tipe_obat">
                    {{ tipe.nama_tipe }}
                  </option>
                </select>
              </td>
            </tr>
            <!-- <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Tag</th>
              <td>
                <input v-model="selectedObat.tags[0].nama_tag" type="checkbox"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr> -->
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Tag Obat</th>
              <td>
                <div class="max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                  <div v-for="tag in tagObats" :key="tag.id_tag_obat">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" :value="tag.id_tag_obat" v-model="selectedTags" />
                      <span>{{ tag.nama_tag }}</span>
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Harga Beli</th>
              <td>
                <input v-model="formattedHarga.harga_beli" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Harga Jual</th>
              <td>
                <input v-model="formattedHarga.harga_jual" type="text"
                  class="w-full py-2 pl-2 border border-gray-300 rounded" />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Margin</th>
              <td>
                <label class="w-full pr-20 py-2 pl-2 margin border border-gray-300 rounded"> {{
                  formattedRupiah(selectedObat.harga_jual -
                    selectedObat.harga_beli) }}</label>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end pr-12 mt-8">
          <button type="submit" class="px-4 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="showCreateModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg pt-10 pb-16 w-[40rem] pl-10 pr-10 border border-black">
      <div class="-mt-6 pb-4">
        <div class="flex justify-end pr-6 pt-2">
          <button @click="closeCreateModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"
              class="hover:fill-red-600">
              <path
                d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
              </path>
            </svg>
          </button>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-center">Tambah Obat</h2>
        </div>
      </div>
      <div class="border-b-2"></div>
      <form @submit.prevent="createObat" class="max-h-[750px] overflow-y-auto">
        <table class="w-full border border-gray-300 ">
          <tbody>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Nama Obat</th>
              <td>
                <input @change="getGambarObat(newObat.nama_obat)" v-model="newObat.nama_obat" type="text"
                  class="w-full p-2 border border-gray-300 rounded" required />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Kode Obat</th>
              <td>
                <input v-model="newObat.kode_obat" type="text" class="w-full p-2 border border-gray-300 rounded"
                  required disabled />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Dosis</th>
              <td>
                <input v-model="newObat.dosis_obat" type="text" class="w-full p-2 border border-gray-300 rounded"
                  required />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Merk Obat</th>
              <td>
                <input v-model="newObat.merk_obat" type="text" class="w-full p-2 border border-gray-300 rounded"
                  required />
              </td>
            </tr>
            <tr class="py-3">
              <th class="text-start py-3 pl-4 pr-20">Resep Dokter</th>
              <td>
                <select v-model="newObat.is_prescription" class="w-full py-2 pl-2 border border-gray-300 rounded">
                  <option :value="true">Ya</option>
                  <option :value="false">Tidak</option>
                </select>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Golongan Obat</th>
              <td>
                <input v-model="newObat.golongan_obat" type="text" class="w-full p-2 border border-gray-300 rounded"
                  required />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Deskripsi</th>
              <td>
                <textarea v-model="newObat.deskripsi" class="w-full p-2 border border-gray-300 rounded"
                  required></textarea>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Harga Beli</th>
              <td>
                <input v-model.number="newObat.harga_beli" type="number"
                  class="w-full p-2 border border-gray-300 rounded" required />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Harga Jual</th>
              <td>
                <input v-model.number="newObat.harga_jual" type="number"
                  class="w-full p-2 border border-gray-300 rounded" required />
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Pemasok</th>
              <td>
                <select v-model="newObat.id_pemasok" class="w-full p-2 border border-gray-300 rounded" required>
                  <option v-for="pemasok in pemasoks" :key="pemasok.id_pemasok" :value="pemasok.id_pemasok">
                    {{ pemasok.nama }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Tipe Obat</th>
              <td>
                <select v-model="newObat.id_tipe_obat" class="w-full p-2 border border-gray-300 rounded" required>
                  <option v-for="tipe in tipeObats" :key="tipe.id_tipe_obat" :value="tipe.id_tipe_obat">
                    {{ tipe.nama_tipe }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Tag Obat</th>
              <td>
                <div class="max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                  <div v-for="tag in tagObats" :key="tag.id_tag_obat">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" :value="tag.id_tag_obat" v-model="selectedTags" />
                      <span>{{ tag.nama_tag }}</span>
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            <tr class="py-3 border-b border-gray-300">
              <th class="text-start py-3 pl-4 pr-20">Gambar</th>
              <td>
                <!-- Tombol Pilih Gambar -->
                <button @click="showModalGambar = true" class="px-4 py-2 bg-blue-600 text-white rounded">
                  Pilih Gambar
                </button>
                <div v-if="newObat.gambar_obat" class="mt-4">
                  <p class="text-sm text-gray-600">Gambar Terpilih:</p>
                  <img :src="getGambar(newObat.gambar_obat)" class="w-32 mt-2 rounded border" />
                </div>
                <!-- <select v-model="newObat.gambar_obat" class="w-full p-2 border border-gray-300 rounded" required>
                  <option v-for="gambar in GambarObat" :key="gambar.id" :value="gambar">
                    {{ getFullImgPath(gambar) }}
                  </option>
                </select> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center mt-4">
          <button type="submit" class="px-4 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700">
            Tambah Obat
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="showCreateModalexcel"
    class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg pt-6 pb-8 px-8 w-[100rem]">
      <div class="flex justify-end pr-6 pt-2">
        <button @click="closeBatchModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"
            class="hover:fill-red-600">
            <path
              d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
            </path>
          </svg>
        </button>
      </div>
      <h2 class="text-lg font-semibold text-center mb-4">Import Excel Obat</h2>

      <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" class="mb-4" />
      <button @click="selectDirectoryAndMatchImages" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Pilih Direktori Gambar
      </button>
      <div v-if="excelData.length > 0" class="overflow-y-auto max-h-60 border rounded-md p-2 bg-gray-50">
        <table class="table-auto w-full text-sm">
          <thead>
            <tr>
              <th class="px-4 py-2 border">No</th>
              <th class="px-4 py-2 border">Nama Obat</th>
              <th class="px-4 py-2 border">Kode Obat</th>
              <th class="px-4 py-2 border">Dosis</th>
              <th class="px-4 py-2 border">Deskripsi</th>
              <th class="px-4 py-2 border">Tipe obat</th>
              <th class="px-4 py-2 border">Tag Obat</th>
              <th class="px-4 py-2 border">Golongan Obat</th>
              <th class="px-4 py-2 border">Resep Dokter</th>
              <th class="px-4 py-2 border">Harga Beli</th>
              <th class="px-4 py-2 border">Harga Jual</th>
              <th class="px-4 py-2 border">Stok Awal</th>
              <th class="px-4 py-2 border">Margin</th>
              <th class="px-4 py-2 border">Lokasi</th>
              <th class="px-4 py-2 border">Tanggal Kadaluarsa</th>
              <th class="px-4 py-2 border">Keterangan</th>
              <th class="px-4 py-2 border">Pemasok</th>
              <th class="px-4 py-2 border">Merk</th>
              <th class="px-4 py-2 border">Gambar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in excelData" :key="index">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
              <td class="px-4 py-2 border">{{ item.nama_obat }}</td>
              <td class="px-4 py-2 border">{{ item.kode_obat }}</td>
              <td class="px-4 py-2 border">{{ item.dosis_obat }}</td>
              <td class="px-4 py-2 border">{{ item.deskripsi }}</td>
              <td class="px-4 py-2 border">{{ item.nama_tipe }}</td>
              <td class="px-4 py-2 border">{{ item.tag_obat }}</td>
              <td class="px-4 py-2 border">{{ item.golongan_obat }}</td>
              <td class="px-4 py-2 border">{{ item.resep_dokter }}</td>
              <td class="px-4 py-2 border">{{ item.harga_beli }}</td>
              <td class="px-4 py-2 border">{{ item.harga_jual }}</td>
              <td class="px-4 py-2 border">{{ item.stok_awal }}</td>
              <td class="px-4 py-2 border">{{ item.margin }}</td>
              <td class="px-4 py-2 border">{{ item.lokasi }}</td>
              <td class="px-4 py-2 border">{{ item.tanggal_kadaluwarsa }}</td>
              <td class="px-4 py-2 border">{{ item.keterangan }}</td>
              <td class="px-4 py-2 border">{{ item.pemasok }}</td>
              <td class="px-4 py-2 border">{{ item.merk_obat }}</td>
              <td class="px-4 py-2 border">
                <img v-if="item.gambar_url" :src="item.gambar_url" alt="Gambar Obat"
                  class="w-16 h-16 object-cover rounded-md cursor-pointer" />
                <span v-else>File Belum Di-Upload</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="CreateObatBatch" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Submit
        </button>
      </div>
    </div>

  </div>
  <!-- Modal -->
  <div v-if="showModalGambar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-[90%] max-w-2xl relative">
      <!-- Close Button -->
      <button @click="showModalGambar = false" class="absolute top-2 right-3 text-gray-500 text-xl">&times;</button>

      <h2 class="text-xl font-bold mb-4">Pilih Gambar Obat</h2>

      <!-- Gambar List -->
      <div class="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto mb-4">
        <div v-for="gambar in GambarObat" :key="gambar.id" @click="selectGambar(gambar)"
          class="cursor-pointer border rounded overflow-hidden hover:shadow-lg">
          <img :src="getFullImgPath(gambar)" class="w-full h-24 object-cover" />
        </div>
      </div>

      <!-- Upload Gambar -->
      <div class="mb-2">
        <label class="font-semibold">Upload Gambar Baru:</label>
        <input type="file" @change="onFileChange" accept="image/*" class="block mt-2" />
      </div>

      <!-- Selected -->
      <div v-if="newObat.gambar_obat" class="mt-4">
        <p class="text-sm text-gray-600">Gambar Terpilih:</p>
        <img :src="getGambar(newObat.gambar_obat)" class="w-32 mt-2 rounded border" />
      </div>
    </div>
  </div>
  <FloatingChat />
</template>

<script>
import Api from "@/services/Api";
import * as XLSX from "xlsx";
import FloatingChat from "./FloatingChat.vue";
import AI from "@/services/AI";
export default {
  components: {
    FloatingChat
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      dataObat: [],
      GambarObat: [],
      tipeObats: [],
      imageUrls: [],
      tagObats: [],
      excelData: [],
      pemasoks: [],
      showModal: false,
      selectedObat: null,
      showCreateModal: false,
      showCreateModalexcel: false,
      showModalGambar: false,
      uploaded: false,
      newObat: {
        nama_obat: "",
        dosis_obat: "",
        deskripsi: "",
        kode_obat: "",
        id_tipe_obat: null,
        id_pemasok: null,
        harga_beli: null,
        harga_jual: null,
        gambar_obat: null,
        merk_obat: '',
        golongan_obat: '',
        is_prescription: false
      },
      selectedTags: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.dataObat.length / this.itemsPerPage);
    },
    paginatedObats() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.dataObat.slice(start, end);
    },
    formattedHarga() {
      return new Proxy({}, {
        get: (target, key) => {
          return this.formattedRupiah(this.selectedObat[key]);
        },
        set: (target, key, value) => {
          this.selectedObat[key] = parseInt(value.replace(/[^0-9]/g, ""), 10);
          return true;
        }
      });
    }
  },
  mounted() {
    this.getObats();
    this.fetchTipeObats();
    this.fetchTagObats();
    this.fetchPemasoks();
  },
  watch: {
    "newObat.nama_obat"(newVal) {
      if (newVal) {
        this.newObat.kode_obat = newVal
          .toUpperCase()
          .replace(/[AEIOU]/g, "")
          .substring(0, 3);
      } else {
        this.newObat.kode_obat = "";
      }
    },
  },
  methods: {
    getGambar(gambar) {
      console.log('gambar:', gambar);
      if (this.uploaded) {
        return URL.createObjectURL(gambar instanceof File ? gambar : gambar.file);
      } else {
        return this.getFullImgPath(gambar)
      }
    }
    ,
    selectGambar(gambar) {
      this.uploaded = false;
      this.newObat.gambar_obat = gambar;

    },
    cleanJSONMarkdown(raw) {
      return raw
        .replace(/^\s*```(?:json)?\s*/i, "") // hapus ```json atau ```
        .replace(/\s*```$/, "")              // hapus ``` di akhir
        .trim();                             // buang spasi ekstra
    },
    async getGambarObat(namaObat) {
      await Api.GetGambarObatKatalog(namaObat).then(async (result) => {
        this.GambarObat = result.data.gambar_obat;
        console.log(this.GambarObat)
        const res = await AI.generateText(`buatkan Deskripsi singkat obat ini ${namaObat} dengan output format json {deskripsi,golongan_obat}`)
        console.log(this.cleanJSONMarkdown(res))
        var data = this.cleanJSONMarkdown(res);
        data = this.cleanJSONMarkdown(data)
        data = JSON.parse(data)
        this.newObat.deskripsi = data.deskripsi
        this.newObat.golongan_obat = data.golongan_obat
      }).catch((err) => {
        console.log(err)
      }).finally(() => {

      })
    },
    fetchPemasoks() {
      Api.getAllPemasok()
        .then((res) => {
          this.pemasoks = res.data.data;
          console.log(this.pemasoks);
        })
        .catch((err) => console.error(err));
    },
    generateKodeObat(namaObat) {
      if (!namaObat) return "";

      const kodeUnik = namaObat
        .toUpperCase()
        .replace(/[AEIOU]/g, "")
        .substring(0, 3);

      return kodeUnik;
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    openCreateModalExcel() {
      this.showCreateModalexcel = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
      this.showCreateModalexcel = false;
      this.resetForm();
    },
    closeBatchModal() {
      this.showCreateModalexcel = false;
      this.excelData = [];
    },
    fetchTipeObats() {
      Api.getAllTipeObat()
        .then((res) => {
          this.tipeObats = res.data;
        })
        .catch((err) => console.error(err));
    },
    fetchTagObats() {
      Api.getAllTagObat()
        .then((res) => {
          this.tagObats = res.data;
        })
        .catch((err) => console.error(err));
    },
    onFileChange(e) {
      this.newObat.gambar_obat = e.target.files[0];
      console.log(this.newObat.gambar_obat)
      this.uploaded = true
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        alert("Please upload a valid file!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        this.excelData = jsonData.map((item) => ({
          nama_obat: item["Nama Obat"],
          kode_obat: this.generateKodeObat(item["Nama Obat"]),
          dosis_obat: item["Dosis"],
          deskripsi: item["Deskripsi"],
          nama_tipe: item["Tipe Obat"],
          tag_obat: item["Tag Obat"] ? item["Tag Obat"].split(",").map(tag => tag.trim()) : [],
          harga_beli: item["Harga Beli"],
          harga_jual: item["Harga Jual"],
          gambar_path: item["Gambar"],
          resep_dokter: item["Resep Dokter"] === "Ya" ? true : false,
          lokasi: item["Lokasi"],
          tanggal_kadaluwarsa: item["Tanggal Kadaluarsa"],
          keterangan: item["Keterangan"],
          stok_awal: item["Stok"],
          pemasok: item["Pemasok"],
          merk_obat: item["Merk"],
          golongan_obat: item["Golongan"],
          margin: item["Harga Jual"] - item["Harga Beli"],
          gambar_file: null,
          gambar_url: null,
        }));
      };

      reader.readAsArrayBuffer(file);
    },

    async selectDirectoryAndMatchImages() {
      const files = await this.selectDirectory();
      this.excelData = this.excelData.map((item) => {
        const fileName = item.gambar_path.replace(/\\/g, "/").split("/").pop();
        const matchedFile = files.find((file) => file.name === fileName);

        if (matchedFile) {
          item.gambar_file = matchedFile;
          item.gambar_url = URL.createObjectURL(matchedFile);
        } else {
          item.gambar_file = null;
          item.gambar_url = null;
        }
        return item;
      });

      console.log("Data setelah mencocokkan gambar:", this.excelData);
    },

    selectDirectory() {
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.webkitdirectory = true;
        input.onchange = (event) => {
          resolve(Array.from(event.target.files));
        };
        input.click();
      });
    },
    CreateObatBatch() {
      if (!this.excelData || this.excelData.length === 0) {
        alert("Tidak ada data yang akan dikirim. Harap unggah file Excel terlebih dahulu.");
        return;
      }

      const formDataArray = [];
      const batchSize = 250; // Define the batch size
      const obatList = [];

      // Process the Excel data
      this.excelData.forEach((item) => {
        if (!item.nama_obat || !item.kode_obat || !item.dosis_obat || !item.nama_tipe || !item.pemasok) {
          console.error("Data obat tidak valid:", item);
          return;
        }

        const stokData = [
          {
            lokasi: item.lokasi,
            tanggal_kadaluwarsa: new Date().toISOString(),
            stok_awal: item.stok_awal,
            stok_akhir: item.stok_awal,
            jumlah_stok_transaksi: item.stok_awal,
            tipe_transaksi: "MASUK",
            keterangan: `Stok awal untuk ${item.nama_obat}`
          }
        ];

        const obatData = {
          kode_obat: item.kode_obat,
          nama_obat: item.nama_obat,
          dosis_obat: item.dosis_obat,
          deskripsi: item.deskripsi,
          harga_beli: item.harga_beli,
          harga_jual: item.harga_jual,
          merk_obat: item.merk_obat,
          golongan_obat: item.golongan_obat,
          pemasok: { nama: item.pemasok },
          resep: item.resep_dokter,
          margin: item.margin,
          tipe_obat: { nama_tipe: item.nama_tipe },
          tag_obat: item.tag_obat,
          stok: stokData
        };

        obatList.push(obatData);

        // Group into batches
        if (obatList.length === batchSize) {
          const formData = new FormData();
          formData.append("data", JSON.stringify(obatList));

          // Add images if available
          this.excelData.forEach((data) => {
            if (data.gambar_file) {
              formData.append("gambar", data.gambar_file);
            }
          });

          formDataArray.push(formData);
          obatList.length = 0; // Clear the list for the next batch
        }
      });

      // Add remaining data if any
      if (obatList.length > 0) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(obatList));

        this.excelData.forEach((data) => {
          if (data.gambar_file) {
            formData.append("gambar", data.gambar_file);
          }
        });

        formDataArray.push(formData);
      }

      // Send the data in batches
      const sendBatch = async () => {
        for (let i = 0; i < formDataArray.length; i++) {
          try {
            console.log(`Sending batch ${i + 1} of ${formDataArray.length}`);
            await Api.createBatchObat(formDataArray[i]);
            console.log(`Batch ${i + 1} sent successfully.`);
          } catch (error) {
            console.error(`Error in batch ${i + 1}:`, error);
            alert(`Terjadi kesalahan pada batch ${i + 1}. Coba lagi.`);
            return;
          }
        }

        alert("Semua obat berhasil ditambahkan!");
        this.closeCreateModal();
        this.closeBatchModal();
        this.getObats();
      };

      sendBatch();
    },


    resetForm() {
      this.newObat = {
        nama_obat: "",
        dosis_obat: "",
        deskripsi: "",
        id_tipe_obat: "",
        kode_obat: "",
        harga_obat: null,
        gambar_obat: null,
        merk_obat: '',
        golongan_obat: ''
      };
      this.selectedTags = [];
      this.excelData = [];
    },
    createObat() {
      const formData = new FormData();
      formData.append("nama_obat", this.newObat.nama_obat);
      formData.append("kode_obat", this.newObat.kode_obat);
      formData.append("dosis_obat", this.newObat.dosis_obat);
      formData.append("deskripsi", this.newObat.deskripsi);
      formData.append("id_tipe_obat", this.newObat.id_tipe_obat);
      formData.append("id_pemasok", this.newObat.id_pemasok);
      formData.append("harga_beli", this.newObat.harga_beli);
      formData.append("harga_jual", this.newObat.harga_jual);
      formData.append("gambar", this.newObat.gambar_obat);
      formData.append("golongan_obat", this.newObat.golongan_obat)
      formData.append("merk_obat", this.newObat.merk_obat)

      this.selectedTags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      Api.createObat(formData)
        .then(() => {
          alert("Obat berhasil ditambahkan!");
          this.closeCreateModal();
          this.getObats();
        })
        .catch((err) => {
          console.error(err);
          alert("Terjadi kesalahan saat menambah obat.");
        });
    },

    closeModal() {
      this.showModal = !this.showModal;
    },
    openEditModal(obat) {
      this.selectedObat = {
        ...obat,
      };
      this.showModal = true;
      console.log(this.selectedObat);
    },
    updateObat() {
      Api.updateObat(this.selectedObat.id_obat, this.selectedObat)
        .then(() => {
          alert(`Update obat ${this.selectedObat.nama_obat} berhasil!!!`);
          this.showModal = false;
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteObat(obat) {
      Api.deleteObat(obat.id_obat)
        .then(() => {
          alert(`Berhasil menghapus obat ${obat.nama_obat}`);
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formattedRupiah(x) {
      return "Rp " + x.toLocaleString("id-ID");
    },
    getFullImgPath(img) {
      return `http://localhost:3000/${img}`;
    },
    getObats() {
      Api.getObat()
        .then((res) => {
          this.dataObat = res.data.map((obat) => {
            return {
              ...obat,
            };
          })
          this.dataObat = this.dataObat.sort((a, b) => b.id_obat - a.id_obat);
          console.log(this.dataObat);
        })
        .catch((err) => {
          console.log(err);
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
  },
};
</script>
