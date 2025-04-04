<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-200">
        <div class="w-96 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fullname" v-model="form.full_name"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name" required />
                </div>

                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" id="username" v-model="form.username"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username" required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">email</label>
                    <input type="text" id="email" v-model="form.email"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email" required />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="form.password"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password" required />
                </div>

                <div class="mb-4">
                    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" id="role" v-model="form.role"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option value="apoteker">Apoteker
                        </option>
                        <option value="kasir">Kasir</option>
                    </select>
                    <!-- <input type="text" id="role" v-model="form.role"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your role" required /> -->
                </div>

                <div class="mb-4">
                    <label for="telpon" class="block text-sm font-medium text-gray-700">Telpon</label>
                    <input type="tel" id="telpon" v-model="form.telpon"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number" required />
                </div>

                <div class="mb-4">
                    <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
                    <textarea id="alamat" v-model="form.alamat"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your address" required></textarea>
                </div>

                <div v-if="error" class="mb-4 text-red-600 text-sm">{{ error }}</div>

                <button type="submit"
                    class="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700">
                    Sign Up
                </button>
                <p class="text-sm text-center mt-4">
                    sudah Memiliki Akun?
                    <router-link to="/login" class="text-emerald-600 hover:underline">
                        Masuk Sekarang
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
