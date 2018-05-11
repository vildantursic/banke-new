<template>
  <div class="sidebar">
    <AppMagazine :magazine="magazines[0]"></AppMagazine>
    <a href="http://banke.forumotion.me/" target="_blank">
      <AppMiniHeader :title="'Forum'" :filter="''"></AppMiniHeader>
    </a>
    <div class="ui banner test ad" data-text="Banner"></div>
    <div v-for="(clientType, j) of clientTypes" :key="j + 'type'">
      <AppMiniHeader v-if="categoryFilter(clientType).length !== 0" :title="clientType.name" :filter="''"></AppMiniHeader>
      <AppClients v-if="categoryFilter(clientType).length !== 0" :clients="categoryFilter(clientType)"></AppClients>
    </div>
    <div class="side-section" v-for="(category, i) of categories" :key="i">
      <AppMiniHeader :title="category.name" :filter="category.id" @onHeaderClick="headerClicked($event)"></AppMiniHeader>
      <AppArticle v-for="(item, j) of category.items" :key="j" :data="item" :isVideo="category.slug == 'video' ? true : false"></AppArticle>
      <div class="ui banner test ad" data-text="Banner"></div>
    </div>
  </div>
</template>

<script>
import AppArticle from '~/components/AppArticle';
import AppMiniHeader from '~/components/AppMiniHeader';
import AppMagazine from '~/components/AppMagazine';
import AppClients from '~/components/AppClients';
import { find } from 'lodash'

export default {
  components: {
    AppArticle,
    AppMiniHeader,
    AppMagazine,
    AppClients
  },
  props: ['categories', 'magazines', 'advertisements', 'clients', 'clientTypes'],
  methods: {
    headerClicked (event) {
      this.$emit('onFilterSelected', event);
    },
    categoryFilter(type) {
      return this.clients.filter(client => find(client['client-types'], o => o === type.id))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/leafs.scss';

.sidebar {
  width: 100%;
}

.side-section {
  margin: 10px 0 0 0;
}
</style>
