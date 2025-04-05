<template>
<div class="flex justify-center items-center min-h-screen bg-gray-200 pt-16">
  <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Daftar Akun</h2>

    <form @submit.prevent="register" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="fullname" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input type="text" id="fullname" v-model="form.full_name"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan nama lengkap Anda" required />
      </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
        <input type="text" id="username" v-model="form.username"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan nama pengguna Anda" required />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" id="email" v-model="form.email"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan email Anda" required />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
        <input type="password" id="password" v-model="form.password"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan kata sandi Anda" required />
      </div>

      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Peran</label>
        <select id="role" v-model="form.role"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
          <option value="apoteker">Apoteker</option>
          <option value="kasir">Kasir</option>
        </select>
      </div>

      <div>
        <label for="telpon" class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
        <input type="tel" id="telpon" v-model="form.telpon"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan nomor telepon Anda" required />
      </div>

      <div class="md:col-span-2">
        <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
        <textarea id="alamat" v-model="form.alamat" rows="3"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan alamat Anda" required></textarea>
      </div>

      <div class="md:col-span-2" v-if="error">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <div class="md:col-span-2">
        <div class="flex items-center justify-center">
          <button type="submit"
            class="w-1/2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200">
            Daftar
          </button>
        </div>
        <p class="text-sm text-center mt-4 text-gray-600">
          Sudah memiliki akun?
          <router-link to="/login" class="text-emerald-600 font-medium hover:underline">
            Masuk sekarang
          </router-link>
        </p>
      </div>
    </form>
  </div>
</div>


</template>

<script>
import Api from '@/services/Api';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            form: {
                full_name: '',
                email: '',
                username: '',
                password: '',
                role: '',
                telpon: '',
                alamat: ''
            },
            error: ''
        };
    },
    methods: {
        async register() {
            this.error = '';
            try {
                const response = await Api.postSignup(this.form);
                console.log(response);

                // SweetAlert success
                await Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You can now login with your account',
                    confirmButtonColor: '#10b981' // emerald
                });

                this.$router.push('/login');
            } catch (err) {
                console.error(err);

                // SweetAlert error
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Please check your input and try again',
                    confirmButtonColor: '#ef4444' // red
                });

                this.error = 'Registration failed. Please check your input.';
            }
        }
    }
};
</script>
