<template>
  <section class="container">
    <sui-grid celled>
      <sui-grid-row>
        <AppSlider  :featured="items"></AppSlider>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :width="10">
          <div class="ui leaderboard test ad" data-text="Leaderboard"></div>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <div class="ui leaderboard test ad" data-text="Leaderboard"></div>
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :width="10">
          <div class="search-filter-section">
            <sui-input placeholder="Search..." v-model="search"/>
          </div>
          <sui-card-group :items-per-row="2">
            <AppPost v-for="(item, i) of filteredItems" :key="i" :data="item"></AppPost>
          </sui-card-group>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <AppMagazine :magazine="magazines[0]"></AppMagazine>
          <div class="ui banner test ad" data-text="Banner"></div>
          <div class="side-section" v-for="(category, i) of categories" :key="i">
            <AppMiniHeader :title="category.name" :filter="category.slug"></AppMiniHeader>
            <AppArticle v-for="(item, j) of category.items" :key="j"></AppArticle>
            <div class="ui banner test ad" data-text="Banner"></div>
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </section>
</template>

<script>
import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import AppPost from '@/components/AppPost';
import AppArticle from '@/components/AppArticle';
import AppMiniHeader from '@/components/AppMiniHeader';
import AppSlider from '@/components/AppSlider';
import AppMagazine from '@/components/AppMagazine';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

export default {
  components: {
    AppPost,
    AppArticle,
    AppMiniHeader,
    AppSlider,
    AppMagazine
  },
  data () {
    return {
      search: '',
      items: [],
      categories: [],
      magazines: [],
      listOfCategories: ['biznis', 'finansije']
    }
  },
  created () {
    this.getItems();
    this.getCategories();
    this.getMagazines();
  },
  computed: {
    filteredItems () {
      return this.items.filter((item) => {
        return item.title.rendered.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      });
    }
  },
  methods: {
    getItems () {
      axios.get('http://localhost/banke-new-cms/wp-json/wp/v2/posts?_embed').then((response) => {
        this.items = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getByCategory (id, name, slug) {
      axios.get(`http://localhost/banke-new-cms/wp-json/wp/v2/posts?categories=${id}&_embed`).then((response) => {
        console.log(response.data)
        this.categories.push({
          name: name,
          slug: slug,
          items: response.data
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    getCategories () {
      axios.get(`http://localhost/banke-new-cms/wp-json/wp/v2/categories`).then((response) => {
        console.log(response.data);
        response.data.forEach(category => {
          if (this.listOfCategories.filter(item => item === category.slug).length !== 0) {
            this.getByCategory(category.id, category.name, category.slug);
          }
        })
      }).catch((error) => {
        console.log(error);
      });
    },
    getMagazines () {
      axios.get(`http://localhost/banke-new-cms/wp-json/wp/v2/magazines?_embed`).then((response) => {
        console.log(response.data)
        this.magazines = response.data;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/leafs.scss';

.container {
  min-height: 100vh;
  @extend .page-size;
}

.side-section {
  margin: 10px 0 0 0;
}

.search-filter-section {
  margin-bottom: 15px;
}
</style>
