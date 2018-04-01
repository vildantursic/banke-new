<template>
  <div>
    <AppHeader></AppHeader>
    <nuxt/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>

</style>
