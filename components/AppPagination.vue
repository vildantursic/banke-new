<template>
  <div class="ui pagination menu">
    <!-- {{(Math.ceil(numberOfItems / itemsPerPage))}} -->
    <a class="icon item" v-on:click="onPageClick(currentPage - 1)">
      <i class="left chevron icon"></i>
    </a>

    <a class="item" v-if="!(currentPage < 3)">...</a>

    <a class="item"
      :class="{active: currentPage == index}"
      v-if="index >= (currentPage - 2) && index <= (currentPage + 2)"
      v-for="(pg, index) of Array(numberOfItems)"
      :key="index"
      v-on:click="onPageClick(index)">{{index + 1}}</a>

    <a class="item" v-if="!(currentPage > numberOfItems - 4)">...</a>

    <a class="icon item" v-on:click="onPageClick(currentPage + 1)">
      <i class="right chevron icon"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'numberOfItems', 'itemsPerPage'],
  methods: {
    onPageClick(page) {
      console.log(page)
      this.$emit('onPageClick', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0 !important;
}
</style>
