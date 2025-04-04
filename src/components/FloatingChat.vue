<template>
    <div>
        <!-- Chat Button -->
        <button @click="toggleChat"
            class="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
            aria-label="Chat">
            💬
        </button>

        <!-- Chat Box -->
        <transition name="fade">
            <div v-if="isOpen"
                class="fixed bottom-20 right-4 w-[370px] h-[520px] bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col z-50">
                <!-- Header -->
                <div class="p-4 border-b font-semibold bg-blue-600 text-white rounded-t-2xl text-lg">
                    Chat Assistant
                </div>

                <!-- Chat Messages -->
                <div class="flex-1 overflow-y-auto p-4 space-y-3 text-base scroll-smooth">
                    <div v-for="(msg, index) in messages" :key="index"
                        :class="msg.role === 'user' ? 'text-right' : 'text-left'">
                        <div :class="[
                            'inline-block px-4 py-2 rounded-xl max-w-[80%] break-words',
                            msg.role === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 text-gray-700',
                        ]">
                            {{ msg.content }}
                        </div>
                    </div>

                    <!-- Spinner Saat Menunggu Jawaban -->
                    <div v-if="loading" class="text-left">
                        <div class="inline-block px-4 py-2 rounded-xl bg-gray-100 text-gray-500 text-base">
                            <svg class="animate-spin h-5 w-5 mr-2 inline-block text-blue-500"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>
                            Sedang mengetik...
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <form @submit.prevent="sendMessage" class="p-3 border-t flex gap-2">
                    <input v-model="input" type="text" placeholder="Tulis pesan..."
                        class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <button type="submit" :disabled="loading"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-700 transition disabled:opacity-50">
                        Kirim
                    </button>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
import AI from "@/services/AI";
import { ref } from "vue";

export default {
    name: "FloatingChat",
    setup() {
        const isOpen = ref(false);
        const input = ref("");
        const messages = ref([
            { role: "bot", content: "Halo! Ada yang bisa saya bantu?" },
        ]);
        const loading = ref(false);

        const toggleChat = () => {
            isOpen.value = !isOpen.value;
        };

        const sendMessage = async () => {
            const message = input.value.trim();
            if (!message || loading.value) return;

            messages.value.push({ role: "user", content: message });
            input.value = "";
            loading.value = true;

            try {
                const response = await AI.generateText(message);
                messages.value.push({ role: "bot", content: response });
            } catch (err) {
                messages.value.push({
                    role: "bot",
                    content: "Maaf, terjadi kesalahan saat memproses permintaan.",
                });
            } finally {
                loading.value = false;
            }
        };

        return {
            isOpen,
            input,
            messages,
            toggleChat,
            sendMessage,
            loading,
        };
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Optional: Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 3px;
}
</style>