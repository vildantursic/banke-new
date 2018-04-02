<template>
  <sui-item class="fix-item">
    <sui-item-image v-if="data._embedded['wp:featuredmedia']" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
    <sui-item-image v-if="!data._embedded['wp:featuredmedia']" :src="'test'" />
    <sui-item-content>
      <sui-item-header>
        <router-link :to="{ name: 'post-id', params: { id: data.id } }">{{data.title.rendered}}</router-link>
      </sui-item-header>
      <sui-item-meta>
        <span>
          <sui-icon name="calendar alternate outline" />
          {{data.date | formatDate}}
        </span>
      </sui-item-meta>
      <sui-item-description>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </sui-item-description>
      <sui-item-extra>
        <a is="sui-label" color="blue">
          Finances
          <sui-label-detail>23</sui-label-detail>
        </a>
      </sui-item-extra>
    </sui-item-content>
  </sui-item>
</template>

<script>
import moment from 'moment';

export default {
  props: ['data'],
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-item {
  overflow: hidden;

  .image {
    width: 250px !important;
    height: 190px !important;
  }
}

img {
  min-height: 100% !important;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
