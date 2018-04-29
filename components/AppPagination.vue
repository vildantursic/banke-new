<template>
  <div class="ui pagination menu" v-if="numberOfItems > 0">
    <!-- {{(Math.ceil(numberOfItems / itemsPerPage))}} -->
    <a class="icon item" v-on:click="onPageClick(currentPage - itemsPerPage)">
      <i class="left chevron icon"></i>
    </a>

    <a class="item">{{Math.ceil(currentPage / itemsPerPage) + 1}} / {{Math.ceil(numberOfItems / itemsPerPage)}}</a>

    <a class="icon item" v-on:click="onPageClick(currentPage + itemsPerPage)">
      <i class="right chevron icon"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'numberOfItems', 'itemsPerPage'],
  methods: {
    onPageClick(page) {
      if (page >= 0 && page < this.numberOfItems) {
        this.$emit('onPageClick', page)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0 !important;
}
</style>
