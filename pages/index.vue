<template>
  <section class="container">
    <sui-grid>
      <sui-grid-row>
        <AppSlider  :featured="items"></AppSlider>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <div class="ui leaderboard test ad" data-text="Leaderboard"></div>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <div class="ui leaderboard test ad" data-text="Leaderboard"></div>
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <div class="search-filter-section">
            <sui-input placeholder="Search..." v-model="search"/>
            <div class="buttons">
              <sui-button v-if="list" v-on:click="() => list = false" icon="th" />
              <sui-button v-if="!list" v-on:click="() => list = true" icon="list ul" />
            </div>
          </div>
          <sui-item-group divided v-if="list" :items-per-row="1">
            <AppPostList v-for="(item, i) of filteredItems" :key="i" :data="item"></AppPostList>
          </sui-item-group>
          <sui-card-group v-if="!list" :items-per-row="2">
            <AppPost v-for="(item, i) of filteredItems" :key="i" :data="item"></AppPost>
          </sui-card-group>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
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
import AppPost from '@/components/AppPost';
import AppPostList from '@/components/AppPostList';
import AppArticle from '@/components/AppArticle';
import AppMiniHeader from '@/components/AppMiniHeader';
import AppSlider from '@/components/AppSlider';
import AppMagazine from '@/components/AppMagazine';
import axios from 'axios';

export default {
  components: {
    AppPost,
    AppPostList,
    AppArticle,
    AppMiniHeader,
    AppSlider,
    AppMagazine
  },
  data () {
    return {
      list: true,
      search: '',
      items: [],
      categories: [],
      magazines: [],
      advertisements: [],
      listOfCategories: ['biznis', 'finansije']
    }
  },
  created () {
    this.getItems();
    this.getCategories();
    this.getMagazines();
    this.getAdvertisements();
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
        this.magazines = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getAdvertisements () {
      axios.get(`http://localhost/banke-new-cms/wp-json/wp/v2/advertisements?_embed`).then((response) => {
        console.log(response.data)
        this.advertisements = response.data;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
