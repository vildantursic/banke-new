<template>
  <div class="ad-section">
    <a v-if="advertisement" :href="advertisement.acf ? advertisement.acf.url : ''" target="_blank">
      <div class="ui test ad" :class="[large ? 'leaderboard' : 'banner', '']" :style="{background: 'url('+ advertisement._embedded['wp:featuredmedia'][0].source_url +')  no-repeat center'}"></div>
    </a>
    <div v-if="!advertisement" class="ui test ad" :class="[large ? 'leaderboard' : 'banner', '']" data-text="Tvoja reklama ide ovdje"></div>
  </div>
</template>

<script>
export default {
  props: ['advertisement', 'large']
}
</script>

<style lang="scss">
.test {
  width: 100% !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  &:after {
    content: "" !important;
  }
}

.ad-section {
  width: 100% !important;

  div {
    width: 100% !important;
    cursor: pointer;
  }
}
</style>
