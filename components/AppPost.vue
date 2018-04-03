<template>
  <sui-card class="fix-card">
    <div class="image-content">
      <sui-image class="fix-image" v-if="data._embedded['wp:featuredmedia'] != undefined" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
      <div v-if="data._embedded['wp:featuredmedia'] == undefined" class="no-image logo">
        Banke <span class="and">&</span> Biznis
      </div>
    </div>
    <sui-card-content>
      <sui-card-header class="fix-header">
        <router-link :to="{ name: 'post-id', params: { id: data.id } }">
          {{data.title.rendered}}
        </router-link>
        <h3>
          {{data.acf.subtitle}}
        </h3>
      </sui-card-header>
    </sui-card-content>
    <sui-card-content extra>
      <div class="flex-between">
        <span>
          <sui-icon name="calendar alternate outline" />
          {{data.date | formatDate}}
        </span>
        <a is="sui-label" color="blue">
          Finances
          <sui-label-detail>23</sui-label-detail>
        </a>
      </div>
    </sui-card-content>
  </sui-card>
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

.fix-card {
  overflow: hidden;

  .image-content {
    min-height: 230px;
    max-height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
  }
  .no-image {
    min-height: 230px;
    max-height: 230px;
    background-color: #222222;
  }

  .fix-header {
    min-height: 100px;
    max-height: 100px;
    overflow: hidden;
  }
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
