<template>
  <sui-card class="fix-card" v-if="magazine">
    <sui-card-content>
      <sui-card-header>
        {{magazine.title.rendered}}
      </sui-card-header>
    </sui-card-content>
    <sui-card-content>
      <div class="center">
        <img class="image" :src="magazine._embedded['wp:featuredmedia']['0'].source_url" alt="">
      </div>
    </sui-card-content>
    <sui-card-content extra>
      <sui-button primary>Subscribe</sui-button>
    </sui-card-content>
  </sui-card>
</template>

<script>
export default {
  props: ['magazine']
}
</script>

<style lang="scss" scoped>
.fix-card {
  width: 100% !important;

  .image {
    width: 50%;
  }

  button {
    width: 100%;
  }
}
</style>
