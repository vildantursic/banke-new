<template>
  <sui-item class="fix-item">
    <sui-item-image v-if="data._embedded['wp:featuredmedia'] != undefined" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
    <div v-if="data._embedded['wp:featuredmedia'] == undefined" class="no-image logo">
      Banke <span class="and">&</span> Biznis
    </div>
    <sui-item-content>
      <sui-item-header>
        <nuxt-link :to="`/post/${data.slug}`">{{data.title.rendered}}</nuxt-link>
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
        <a is="sui-label" color="blue"
                          v-if="categories.length !== 0"
                          v-for="(category, index) of filterCategories"
                          :key="index"
                          v-on:click="selectFilter(category.value)">
          {{category.text}}
          <sui-label-detail>{{category.count}}</sui-label-detail>
        </a>
      </sui-item-extra>
    </sui-item-content>
  </sui-item>
</template>

<script>
  import moment from 'moment';
  import { find } from 'lodash';

export default {
  props: ['data', 'categories'],
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  computed: {
    filterCategories () {
      return this.data.categories.map((category, i) => {
        if (i < 2) {
          return find(this.categories, ['value', category]);
        }
      })
    }
  },
  methods: {
    selectFilter (data) {
      this.$emit('onSelectFilter', data);
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
    background-color: #222222 !important;
    overflow: hidden !important;
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
