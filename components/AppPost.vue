<template>
  <sui-card class="fix-card">
    <div class="image-content" v-if="data._embedded !== undefined">
      <sui-image class="fix-image" v-if="data._embedded['wp:featuredmedia'] != undefined" :src="data._embedded['wp:featuredmedia']['0'].source_url" />
      <div v-if="data._embedded['wp:featuredmedia'] == undefined" class="no-image logo">
        Banke <span class="and">&</span> Biznis
      </div>
    </div>
    <sui-card-content>
      <sui-card-header class="fix-header">
        <nuxt-link :to="`/post/${data.slug}`">
          {{data.title.rendered}}
        </nuxt-link>
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
        <div class="">
          <a is="sui-label" color="blue"
                            v-for="(category, index) of filterCategories"
                            v-if="category"
                            :key="index"
                            v-on:click="selectFilter(category.value)">
            {{category.text}}
            <sui-label-detail>{{category.count}}</sui-label-detail>
          </a>
        </div>
      </div>
    </sui-card-content>
  </sui-card>
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

.fix-card {
  overflow: hidden;

  .image-content {
    min-height: 230px;
    max-height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    overflow: hidden;
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
