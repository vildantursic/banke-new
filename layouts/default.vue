<template>
  <div>
    <AppHeader></AppHeader>
    <nuxt/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import SuiVue from 'semantic-ui-vue';

Vue.use(SuiVue);

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>

</style>
