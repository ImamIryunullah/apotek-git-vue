<template>
  <div class="h-full">
    <div class="bg-gray-200 min-h-screen flex flex-col">
      <div v-if="!isLoginPage">
        <NavPseudo />
      </div>
      <div class="px-10 flex-1">
        <router-view />
      </div>
      <div class="mt-96">
        <FooterPseudo />
      </div>
    </div>
  </div>
</template>

<script>
import NavPseudo from './components/NavPseudo.vue';
import FooterPseudo from './components/FooterPseudo.vue';

export default {
  components: {
    NavPseudo,
    FooterPseudo,
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
};
</script>
