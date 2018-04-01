<template>
  <sui-card class="fix-card">
    <sui-image class="fix-image" v-if="data._embedded['wp:featuredmedia']" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
    <sui-image class="fix-image" v-if="!data._embedded['wp:featuredmedia']" :src="'test'"/>
    <sui-card-content>
      <sui-card-header class="fix-header">
        <router-link :to="{ name: 'post-id', params: { id: data.id } }">
          {{data.title.rendered}}
        </router-link>
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
.fix-card {
  overflow: hidden;

  .fix-image {
    min-height: 230px;
    max-height: 230px;
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
