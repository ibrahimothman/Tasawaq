<template>
  <div class="container">
    <navbar></navbar>
    <login-modal></login-modal>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';

export default {
  components: {
    Navbar,
    LoginModal,
  },
};
</script>
