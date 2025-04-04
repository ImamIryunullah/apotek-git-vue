<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-200">
        <div class="w-96 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="form.email"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email" required />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="form.password"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password" required />
                </div>

                <div v-if="error" class="mb-4 text-red-600 text-sm">{{ error }}</div>

                <button type="submit"
                    class="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700">
                    Login
                </button>
                <p class="text-sm text-center mt-4">
                    Belum Memiliki Akun?
                    <router-link to="/register" class="text-emerald-600 hover:underline">
                        Daftar Sekarang
                    </router-link>
                </p>
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
