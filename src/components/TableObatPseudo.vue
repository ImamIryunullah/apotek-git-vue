<template>
  <div class="bg-white -mx-10 flex items-center justify-between px-20">
    <div>
      <div class="flex space-x-4 py-6 relative -left-6">
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
        <div>
          <div>
            <div class="relative">
              <!-- <div @click="dropdownJenisObat" class="bg-white border border-black rounded-lg cursor-pointer w-52">
                <div class="flex justify-between items-center px-4">
                  <button class="px-2 py-2">
                    <h1>Tipe Transaksi</h1>
                  </button>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div> -->
              <!-- <div v-if="isJenisObatOpen" class="absolute bg-white border border-black mt-2 rounded-lg shadow-lg w-52">
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
              </div> -->
            </div>
          </div>
        </div>
        <div>
          <!-- <div class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
            <button class="px-6 py-2 font-bold text-white">
              <h1>Filter</h1>
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-6">
      <div>
        <input @input="SearchData" v-model="searchInput"
          class="bg-gray-100 border-2 border-black pl-4 w-[30rem] h-[2.8rem] capitalize rounded-lg" type="text"
          placeholder="Cari disini...">
      </div>
      <div class="bg-emerald-600 hover:bg-emerald-700 border border-black rounded-lg">
        <button class="px-6 py-2 font-bold text-white">
          <h1>Cari</h1>
        </button>
      </div>
    </div>
  </div>
  <div class="font-Roboto tracking-wider px-2 py-4">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 shadow-md text-sm rounded-lg">
        <thead class="bg-emerald-600 text-white">
          <tr class="text-left">
            <th class="pl-4 py-2 border-b border">No</th>
            <th class="pl-4 py-2 border-b border">Nama</th>
            <th class="pl-4 py-2 border-b border">Kode</th>
            <th class="px-2 py-2 border-b border">Gambar</th>
            <th class="px-2 py-2 border-b border">Dosis</th>
            <th class="px-2 py-2 border-b border">Deskripsi</th>
            <th class="px-2 py-2 border-b border">Beli</th>
            <th class="px-2 py-2 border-b border">Jual</th>
            <th class="px-2 py-2 border-b border">Margin</th>
            <th class="px-2 py-2 border-b border">Tag</th>
            <th class="px-2 py-2 border-b border">Tipe</th>
            <th class="px-2 py-2 border-b border">Stok</th>
            <th class="px-2 py-2 border-b border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obat in paginatedObats" :key="obat.id" class="hover:bg-gray-100">
            <td class="pl-4 py-2 border-b border font-bold">{{ obat.id_obat }}</td>
            <td class="pl-4 py-2 border-b border font-bold">{{ obat.nama_obat }}</td>
            <td class="pl-4 py-2 border-b border font-bold">{{ obat.kode_obat }}</td>
            <td class="px-2 py-2 border-b border">
              <img :src="getFullImgPath(obat.gambar_obat)" alt="{{ obat.nama }}"
                class="w-12 h-12 object-cover rounded" />
            </td>
            <td class="px-2 py-2 border-b border">{{ obat.dosis_obat }}</td>
            <td class="px-2 py-2 border-b border text-xs">
              {{ obat.deskripsi.split(" ").slice(0, 10).join(" ") + "..." }}
            </td>
            <td class="px-2 py-2 border-b border">{{ formattedRupiah(obat.harga_beli) }}</td>
            <td class="px-2 py-2 border-b border">{{ formattedRupiah(obat.harga_jual) }}</td>
            <td class="px-2 py-2 border-b border">{{ formattedRupiah(obat.margin) }}</td>
            <td class="px-2 py-2 border-b border">
              <span v-for="(tag, index) in obat.tags" :key="index">
                {{ tag.nama_tag }}<span v-if="index < obat.tags.length - 1">, </span>
              </span>
            </td>
            <td class="px-2 py-2 border-b border">{{ obat.tipe_obat.nama_tipe }}</td>
            <td class="px-2 py-2 border-b border">
              <span v-if="obat.stok.length > 0">{{ obat.stok[obat.stok.length - 1].stok_akhir }}</span>
              <span v-else>Belum Ada</span>
            </td>
            <td class="px-2 py-2 border-b border">
              <div class="flex items-center space-x-2">
                <button @click="openEditModal(obat)" class="p-1 rounded hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 7.125 18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button @click="deleteObat(obat)" class="p-1 rounded hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9M19.23 5.79A48.11 48.11 0 0 0 15.75 5.4M8.25 5.4a48.11 48.11 0 0 0-3.48.39M3 6.21V18.75A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V6.21" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-end pt-4 pr-8">
        <div class="flex items-center space-x-4 text-sm">
          <button @click="prevPage"
            class="border border-black bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-4 rounded-md">
            Prev
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage"
            class="border border-black bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-4 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 px-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-4 right-4 hover:scale-110 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"
          class="hover:fill-red-600">
          <path
            d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </button>

      <div class="pt-6 px-6">
        <h2 class="text-xl font-semibold text-center mb-4">Edit Obat</h2>
      </div>
      <div class="border-b"></div>

      <form @submit.prevent="updateObat" class="p-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(field, i) in [
            { label: 'Nama Obat', model: 'nama_obat', type: 'text' },
            { label: 'Dosis', model: 'dosis_obat', type: 'text' },
            { label: 'Golongan Obat', model: 'golongan_obat', type: 'text' },
            { label: 'Merk Obat', model: 'merk_obat', type: 'text' }
          ]" :key="i">
            <label class="block font-medium mb-1">{{ field.label }}</label>
            <input v-model="selectedObat[field.model]" :type="field.type"
              class="w-full border border-gray-300 rounded px-2 py-2" />
          </div>

          <div>
            <label class="block font-medium mb-1">Kode Obat</label>
            <div class="border border-gray-300 rounded px-2 py-2">{{ generateKodeObat(selectedObat.nama_obat) }}</div>
          </div>

          <div>
            <label class="block font-medium mb-1">Resep Dokter</label>
            <select v-model="selectedObat.is_prescription" class="w-full border border-gray-300 rounded px-2 py-2">
              <option :value="true">Ya</option>
              <option :value="false">Tidak</option>
            </select>
          </div>

          <div>
            <label class="block font-medium mb-1">Pemasok</label>
            <select v-model="selectedObat.id_pemasok" class="w-full border border-gray-300 rounded px-2 py-2">
              <option v-for="pemasok in pemasoks" :key="pemasok.id_pemasok" :value="pemasok.id_pemasok">
                {{ pemasok.nama }}
              </option>
            </select>
          </div>

          <div>
            <label class="block font-medium mb-1">Tipe Obat</label>
            <select v-model="selectedObat.id_tipe_obat" class="w-full border border-gray-300 rounded px-2 py-2">
              <option v-for="tipe in tipeObats" :key="tipe.id_tipe_obat" :value="tipe.id_tipe_obat">
                {{ tipe.nama_tipe }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-medium mb-1">Deskripsi</label>
          <textarea v-model="selectedObat.deskripsi"
            class="w-full border border-gray-300 rounded px-2 py-2 h-24"></textarea>
        </div>

        <div>
          <label class="block font-medium mb-1">Tag Obat</label>
          <div class="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
            <div v-for="tag in tagObats" :key="tag.id_tag_obat">
              <label class="flex items-center space-x-2">
                <input type="checkbox" :value="tag.id_tag_obat" v-model="selectedTags" />
                <span>{{ tag.nama_tag }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Harga Beli</label>
            <input v-model="formattedHarga.harga_beli" type="text"
              class="w-full border border-gray-300 rounded px-2 py-2" />
          </div>
          <div>
            <label class="block font-medium mb-1">Harga Jual</label>
            <input v-model="formattedHarga.harga_jual" type="text"
              class="w-full border border-gray-300 rounded px-2 py-2" />
          </div>
          <div class="sm:col-span-2">
            <label class="block font-medium mb-1">Margin</label>
            <div class="border border-gray-300 rounded px-2 py-2">
              {{ formattedRupiah(selectedObat.harga_jual - selectedObat.harga_beli) }}
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>


  <div v-if="showCreateModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div
      class="bg-white rounded-lg shadow-xl w-[42rem] max-w-full p-4 relative border border-black max-h-[90vh] overflow-y-auto text-sm">

      <!-- Tombol Close -->
      <button @click="closeCreateModal" class="absolute top-3 right-3 hover:text-red-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Z
               M165.66,101.66L139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32
               L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </button>

      <!-- Judul -->
      <h2 class="text-base font-semibold text-center mb-2">Tambah Obat</h2>
      <hr class="mb-3">

      <form @submit.prevent="createObat" class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <!-- Nama Obat -->
        <div>
          <label class="block font-medium mb-1">Nama Obat</label>
          <input @change="getGambarObat(newObat.nama_obat)" v-model="newObat.nama_obat" type="text" class="input-form"
            required>
        </div>

        <!-- Kode Obat -->
        <div>
          <label class="block font-medium mb-1">Kode Obat</label>
          <input v-model="newObat.kode_obat" type="text" class="input-form" required disabled>
        </div>

        <!-- Dosis -->
        <div>
          <label class="block font-medium mb-1">Dosis</label>
          <input v-model="newObat.dosis_obat" type="text" class="input-form" required>
        </div>

        <!-- Merk -->
        <div>
          <label class="block font-medium mb-1">Merk Obat</label>
          <input v-model="newObat.merk_obat" type="text" class="input-form" required>
        </div>

        <!-- Resep -->
        <div>
          <label class="block font-medium mb-1">Resep Dokter</label>
          <select v-model="newObat.is_prescription" class="input-form">
            <option :value="true">Ya</option>
            <option :value="false">Tidak</option>
          </select>
        </div>

        <!-- Golongan -->
        <div>
          <label class="block font-medium mb-1">Golongan</label>
          <input v-model="newObat.golongan_obat" type="text" class="input-form" required>
        </div>

        <!-- Harga Beli -->
        <div>
          <label class="block font-medium mb-1">Harga Beli</label>
          <input v-model.number="newObat.harga_beli" type="number" class="input-form" required>
        </div>

        <!-- Harga Jual -->
        <div>
          <label class="block font-medium mb-1">Harga Jual</label>
          <input v-model.number="newObat.harga_jual" type="number" class="input-form" required>
        </div>

        <!-- Pemasok -->
        <div>
          <label class="block font-medium mb-1">Pemasok</label>
          <select v-model="newObat.id_pemasok" class="input-form" required>
            <option v-for="pemasok in pemasoks" :key="pemasok.id_pemasok" :value="pemasok.id_pemasok">{{ pemasok.nama }}
            </option>
          </select>
        </div>

        <!-- Tipe Obat -->
        <div>
          <label class="block font-medium mb-1">Tipe Obat</label>
          <select v-model="newObat.id_tipe_obat" class="input-form" required>
            <option v-for="tipe in tipeObats" :key="tipe.id_tipe_obat" :value="tipe.id_tipe_obat">{{ tipe.nama_tipe }}
            </option>
          </select>
        </div>

        <!-- Deskripsi -->
        <div class="md:col-span-2">
          <label class="block font-medium mb-1">Deskripsi</label>
          <textarea v-model="newObat.deskripsi" class="input-form" rows="2" required></textarea>
        </div>

        <!-- Tag Obat -->
        <div class="md:col-span-2">
          <label class="block font-medium mb-1">Tag Obat</label>
          <div class="max-h-32 overflow-y-auto border border-gray-300 rounded p-2 space-y-1">
            <label v-for="tag in tagObats" :key="tag.id_tag_obat" class="flex items-center space-x-2">
              <input type="checkbox" :value="tag.id_tag_obat" v-model="selectedTags" />
              <span>{{ tag.nama_tag }}</span>
            </label>
          </div>
        </div>

        <!-- Gambar -->
        <div class="md:col-span-2">
          <label class="block font-medium mb-1">Gambar Obat</label>
          <button @click="showModalGambar = true" type="button"
            class="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">
            Pilih Gambar
          </button>
          <div v-if="newObat.gambar_obat" class="mt-2">
            <p class="text-xs text-gray-600">Gambar Terpilih:</p>
            <img :src="getGambar(newObat.gambar_obat)" class="w-24 mt-1 rounded border" />
          </div>
        </div>

        <!-- Submit -->
        <div class="md:col-span-2 flex justify-center pt-3">
          <button type="submit" class="px-5 py-1.5 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700">
            Tambah Obat
          </button>
        </div>
      </form>
    </div>
  </div>


  <div v-if="showCreateModalexcel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto px-3 py-3">
      <!-- Close Button -->
      <div class="flex justify-end">
        <button @click="closeBatchModal" class="hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </button>
      </div>

      <!-- Title -->
      <h2 class="text-base font-semibold text-center mb-3">Import Excel Obat</h2>

      <!-- Upload Section -->
      <div class="flex flex-col gap-3 items-center mb-4">
        <div class="w-full max-w-sm flex flex-col gap-1">
          <label class="text-sm font-medium">Upload Excel</label>
          <input type="file" @change="handleFileUpload" accept=".xlsx, .xls"
            class="w-full border border-gray-300 p-1.5 rounded text-sm" />
        </div>

        <div class="w-full max-w-sm flex flex-col gap-1">
          <label class="text-sm font-medium">Direktori Gambar</label>
          <button @click="selectDirectoryAndMatchImages"
            class="w-full px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Pilih Direktori
          </button>
        </div>
      </div>

      <!-- Preview Table -->
      <div v-if="excelData.length" class="max-h-60 overflow-auto border rounded bg-gray-50 text-xs p-2">
        <table class="table-auto w-full">
          <thead class="bg-gray-200 sticky top-0">
            <tr>
              <th class="px-1 py-1 border">No</th>
              <th class="px-1 py-1 border">Nama</th>
              <th class="px-1 py-1 border">Kode</th>
              <th class="px-1 py-1 border">Dosis</th>
              <th class="px-1 py-1 border">Deskripsi</th>
              <th class="px-1 py-1 border">Tipe</th>
              <th class="px-1 py-1 border">Tag</th>
              <th class="px-1 py-1 border">Golongan</th>
              <th class="px-1 py-1 border">Resep</th>
              <th class="px-1 py-1 border">Beli</th>
              <th class="px-1 py-1 border">Jual</th>
              <th class="px-1 py-1 border">Stok</th>
              <th class="px-1 py-1 border">Margin</th>
              <th class="px-1 py-1 border">Lokasi</th>
              <th class="px-1 py-1 border">Exp</th>
              <th class="px-1 py-1 border">Ket</th>
              <th class="px-1 py-1 border">Pemasok</th>
              <th class="px-1 py-1 border">Merk</th>
              <th class="px-1 py-1 border">Gambar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in excelData" :key="index" class="hover:bg-gray-100">
              <td class="border px-1 py-1">{{ index + 1 }}</td>
              <td class="border px-1 py-1">{{ item.nama_obat }}</td>
              <td class="border px-1 py-1">{{ item.kode_obat }}</td>
              <td class="border px-1 py-1">{{ item.dosis_obat }}</td>
              <td class="border px-1 py-1">{{ item.deskripsi }}</td>
              <td class="border px-1 py-1">{{ item.nama_tipe }}</td>
              <td class="border px-1 py-1">{{ item.tag_obat }}</td>
              <td class="border px-1 py-1">{{ item.golongan_obat }}</td>
              <td class="border px-1 py-1">{{ item.resep_dokter }}</td>
              <td class="border px-1 py-1">{{ item.harga_beli }}</td>
              <td class="border px-1 py-1">{{ item.harga_jual }}</td>
              <td class="border px-1 py-1">{{ item.stok_awal }}</td>
              <td class="border px-1 py-1">{{ item.margin }}</td>
              <td class="border px-1 py-1">{{ item.lokasi }}</td>
              <td class="border px-1 py-1">{{ item.tanggal_kadaluwarsa }}</td>
              <td class="border px-1 py-1">{{ item.keterangan }}</td>
              <td class="border px-1 py-1">{{ item.pemasok }}</td>
              <td class="border px-1 py-1">{{ item.merk_obat }}</td>
              <td class="border px-1 py-1">
                <img v-if="item.gambar_url" :src="item.gambar_url" class="w-10 h-10 object-cover rounded" />
                <span v-else class="text-gray-400 text-xs">N/A</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Submit -->
      <div class="flex justify-center items-center mt-2">
        <button @click="CreateObatBatch"
          class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
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
      <div class="mb-2">
        <label class="font-semibold">Upload Gambar Baru:</label>
        <input type="file" @change="onFileChange" accept="image/*" class="block mt-2" />
      </div>
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
      searchInput: '',
      currentPage: 1,
      itemsPerPage: 10,
      dataObat: [],
      GambarObat: [],
      tipeObats: [],
      imageUrls: [],
      tagObats: [],
      excelData: [],
      allObat: [],
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
    },

    selectGambar(gambar) {
      this.uploaded = false;
      this.newObat.gambar_obat = gambar;

    },
    SearchData() {
      const searchTerm = this.searchInput.toLowerCase();

      if (!searchTerm) {
        // Reset ke data awal
        this.dataObat = [...this.allObat];
      } else {
        this.dataObat = this.allObat.filter((obat) => {
          const kodeObatMatch = obat.kode_obat?.toLowerCase().includes(searchTerm);
          const namaObatMatch = obat.nama_obat?.toLowerCase().includes(searchTerm);
          const namaTipeMatch = obat.tipe_obat?.nama_tipe?.toLowerCase().includes(searchTerm);
          const namaTagMatch = obat.tags?.some((tag) => tag.nama_tag.toLowerCase().includes(searchTerm));

          return kodeObatMatch || namaObatMatch || namaTipeMatch || namaTagMatch;
        });
      }

      this.currentPage = 1; // Reset ke halaman pertama setelah search
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
          const obats = res.data.map((obat) => ({ ...obat }));
          this.allObat = obats;
          this.dataObat = obats;
          this.dataObat = this.dataObat.sort((a, b) => b.id_obat - a.id_obat);
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

<style scoped>
.input-form {
  @apply w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500;
}
</style>