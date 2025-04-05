<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-200">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-emerald-700">Selamat Datang Kembali</h2>
          <p class="text-gray-500 mt-2">Masuk ke akun kamu</p>
        </div>
  
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Alamat Email
            </label>
            <div class="relative">
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Masukkan email kamu"
                required
              />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Kata Sandi
              </label>  
            </div>
            <div class="relative">
              <input
                type="password"
                id="password"
                v-model="form.password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Masukkan kata sandi"
                required
              />
            </div>
          </div>
  
          <div v-if="error" class="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {{ error }}
          </div>
  
          <div>
            <button
              type="submit"
              class="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium transition-all"
            >
              Masuk
            </button>
          </div>
        </form>
  
        <p class="text-sm text-center mt-8 text-gray-600">
          Belum memiliki akun?
          <router-link to="/register" class="text-emerald-600 font-medium hover:text-emerald-800">
            Daftar sekarang
          </router-link>
        </p>
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
                email: '',
                password: ''
            },
            error: ''
        };
    },
    methods: {
        async login() {
            this.error = ''; // Reset error message
            try {
                const response = await Api.postLogin(this.form);
                const token = response.data.token;
                const user = response.data.id_user;

                localStorage.setItem('token', token);
                localStorage.setItem('user', user);

                // SweetAlert success
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonColor: '#10b981' // emerald
                });

                this.$router.push('/');
            } catch (err) {
                console.error(err);

                // SweetAlert error
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password',
                    confirmButtonColor: '#ef4444'
                });

                this.error = 'Invalid username or password';
            }
        }
    }
};
</script>


