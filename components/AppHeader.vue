<template>
  <sui-menu class="fix-header">
    <div class="logo">
      <router-link :to="{ name: 'index', params: {} }">
        Banke <span class="and">&</span> Biznis
      </router-link>
    </div>
  </sui-menu>
</template>

<style lang="scss" scoped>
@import '../assets/leafs.scss';

.fix-header {
  height: 50px;
  background: linear-gradient(to right, #222222 35% , #8d3100, #ff7100);
  border-radius: 0;
  border: none;
  margin: 0;
  @extend .page-size;

  a {
    color: white;
  }
}

.filter-fix{
  color: #FF7100 !important;
}
</style>
