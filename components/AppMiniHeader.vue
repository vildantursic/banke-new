<template>
  <div class="article-section-title">
    <h3 class="clickable" v-on:click="headerClick(filter)">{{title}}</h3>
  </div>
</template>

<script>
export default {
  props: ['filter', 'title'],
  methods: {
    headerClick (filter) {
      this.$emit('onHeaderClick', filter);
    }
  }
}
</script>

<style lang="scss">
.article-section-title {
  width: 100%;
  height: auto;
  background: linear-gradient(to right, #222222 35% , #8d3100, #ff7100);
  color: white;
  padding: 10px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;

  &:hover {
    color: #ff7100;
  }
}
</style>
