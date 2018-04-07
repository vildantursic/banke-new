<template>
  <div class="sidebar">
    <AppMagazine :magazine="magazines[0]"></AppMagazine>
    <AppMiniHeader v-on:click="goToForum()" :title="'Forum'" :filter="''"></AppMiniHeader>
    <div class="ui banner test ad" data-text="Banner"></div>
    <div class="side-section" v-for="(category, i) of categories" :key="i">
      <AppMiniHeader :title="category.name" :filter="category.id" @onHeaderClick="headerClicked($event)"></AppMiniHeader>
      <AppArticle v-for="(item, j) of category.items" :key="j" :data="item" :isVideo="category.slug == 'video' ? true : false"></AppArticle>
      <div class="ui banner test ad" data-text="Banner"></div>
    </div>
  </div>
</template>

<script>
import AppArticle from '@/components/AppArticle';
import AppMiniHeader from '@/components/AppMiniHeader';
import AppMagazine from '@/components/AppMagazine';

export default {
  components: {
    AppArticle,
    AppMiniHeader,
    AppMagazine
  },
  props: ['categories', 'magazines', 'advertisements'],
  methods: {
    goToForum () {
      window.open('http://banke.forumotion.me/', '_blank');
    },
    headerClicked (event) {
      this.$emit('onFilterSelected', event);
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
