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
              <sui-button v-on:click="() => showFilters = !showFilters" icon="filter" />
              <sui-button v-if="list" v-on:click="() => list = !list" icon="th" />
              <sui-button v-if="!list" v-on:click="() => list = !list" icon="list ul" />
            </div>
          </div>
          <div v-if="showFilters" class="filters">
            <sui-dropdown fluid
                          multiple
                          :options="allCategories"
                          placeholder="Filters"
                          selection
                          v-model="current"/>
          </div>
          <sui-item-group divided v-if="list" :items-per-row="1">
            <AppPostList v-for="(item, i) of filteredItems" :key="i" :data="item"></AppPostList>
          </sui-item-group>
          <sui-card-group v-if="!list" :items-per-row="2">
            <AppPost v-for="(item, i) of filteredItems" :key="i" :data="item"></AppPost>
          </sui-card-group>
          <div class="pagination">
            <AppPagination :numberOfItems="items.length" :itemsPerPage="2" @onPageClick="setPage($event)"></AppPagination>
          </div>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <AppSidebar :categories="categories"
                      :magazines="magazines"
                      :advertisements="advertisements"></AppSidebar>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </section>
</template>

<script>
import AppSlider from '@/components/AppSlider';
import AppPost from '@/components/AppPost';
import AppPostList from '@/components/AppPostList';
import AppSidebar from '@/components/AppSidebar';
import AppPagination from '@/components/AppPagination';
import axios from 'axios';
import * as _ from 'lodash';

export default {
  components: {
    AppSlider,
    AppPost,
    AppPostList,
    AppSidebar,
    AppPagination
  },
  data () {
    return {
      page: 1,
      list: true,
      showFilters: false,
      search: '',
      items: [],
      categories: [],
      magazines: [],
      advertisements: [],
      listOfCategories: ['video', 'column-and-analysis', 'interviews', 'lifestyle'],
      current: [],
      allCategories: [],
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
        return item.title.rendered.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 &&
        this.current.length != 0 ? _.intersection(item.categories, this.current).length != 0 : true;
      });
    }
  },
  methods: {
    setPage (event) {
      console.log(event);
    },
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
        this.allCategories = response.data.map(obj => {
          return { key: obj.slug, text: obj.name, value: obj.id };
        });
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

.search-filter-section {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filters {
  margin-bottom: 15px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
