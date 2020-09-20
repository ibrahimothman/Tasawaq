<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['user']),
  },
  created() {
    if (this.user) {
      this.$router.push('/admin').catch(() => {});
    }
  },
};
</script>
