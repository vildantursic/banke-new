<template>
  <sui-card class="fix-card" v-if="data">
    <sui-card-content class="fix-content">
      <div v-if="isVideo" class="fix-image">
        <sui-image class="" v-if="data._embedded['wp:featuredmedia']" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
        <div v-if="data._embedded['wp:featuredmedia'] == undefined" class="no-image logo">
          Banke <span class="and">&</span> Biznis
        </div>
      </div>
      <nuxt-link :to="`/post/${data.slug}`">
        <h3 class="">{{data.title.rendered}}</h3>
      </nuxt-link>
    </sui-card-content>
  </sui-card>
</template>

<script>
export default {
  props: ['data', 'isVideo']
}
</script>

<style lang="scss" scoped>
@import '../assets/leafs.scss';

.fix-card {
  width: 100%;
  min-height: 90px;
  max-height: 90px;

  .fix-content {
    display: flex;
    padding: 0;

    h3 {
      margin: 10px;
    }

    .fix-image {
      height: 90px;
      min-width: 30%;
      max-width: 30%;
      overflow: hidden;

      .no-image {
        height: 100%;
        width: 100%;
        background-color: #222222;
      }
      .logo {
        font-size: 15px;
      }

      img {
        height: 100%;
      }
    }
  }
}
</style>
