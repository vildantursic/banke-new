<template>
  <sui-item class="fix-item">
    <sui-item-image v-if="data._embedded['wp:featuredmedia'] != undefined" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
    <div v-if="data._embedded['wp:featuredmedia'] == undefined" class="no-image logo">
      Banke <span class="and">&</span> Biznis
    </div>
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
          {{data.acf.subtitle}}
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
@import '../assets/leafs.scss';

.fix-item {
  overflow: hidden;

  .image {
    width: 250px !important;
    height: 190px !important;
    display: flex !important;
    align-items: center !important;
    background-color: #222222;
  }
  .no-image {
    width: 250px !important;
    height: 190px !important;
    background-color: #222222;
    margin-right: 0.5em;
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
