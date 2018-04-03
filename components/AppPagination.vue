<template>
  <div class="ui right floated pagination menu">
    <a class="icon item">
      <i class="left chevron icon"></i>
    </a>
    <a class="item">1</a>
    <a class="item active">2</a>
    <a class="item">3</a>
    <a class="icon item">
      <i class="right chevron icon"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ['numberOfItems', 'itemsPerPage'],
  methods: {
    onPageClick() {
      this.$emit('onPageClick', page)
    }
  }
}
</script>

<style lang="css">
</style>
