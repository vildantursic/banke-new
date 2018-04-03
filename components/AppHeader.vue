<template>
  <sui-menu class="fix-header">
    <div class="logo">
      <router-link :to="{ name: 'index', params: {} }">
        Banke <span class="and">&</span> Biznis
      </router-link>
    </div>

    <div class="right menu">
      <!-- <button class="ui secondary button tiny filter-fix" v-on:click="openMenu()">
        Filter
      </button> -->
    </div>
  </sui-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    }
  },
  methods: {
    openMenu () {
      this.menu = !this.menu;
      this.$emit('onMenuClicked', this.menu);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/leafs.scss';

.fix-header {
  height: 50px;
  background: linear-gradient(to right, #222222 35% , #8d3100, #ff7100);
  border-radius: 0;
  border: none;
  @extend .page-size;

  a {
    color: white;
  }
}

.filter-fix{
  color: #FF7100 !important;
}
</style>
