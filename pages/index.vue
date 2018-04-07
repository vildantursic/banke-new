<template>
  <section class="container">
    <sui-grid :padded="true">
      <sui-grid-row>
        <AppSlider  :featured="filterFeatured"></AppSlider>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <div v-if="advertisements[1]" class="ui leaderboard test ad" :style="{background: 'url('+ advertisements[1]._embedded['wp:featuredmedia'][0].source_url +')  no-repeat center'}"></div>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <div v-if="advertisements[0]" class="ui leaderboard test ad" :style="{background: 'url('+ advertisements[0]._embedded['wp:featuredmedia'][0].source_url +')  no-repeat center'}"></div>
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <div class="search-filter-section">
            <sui-input placeholder="Pretraži..." v-model="search"/>
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
            <AppPostList v-for="(item, i) of paginatedItems" :key="i" :data="item" :categories="allCategories" @onSelectFilter="selectFilter($event)"></AppPostList>
          </sui-item-group>
          <sui-card-group v-if="!list" :items-per-row="2" :stackable="true">
            <AppPost v-for="(item, i) of paginatedItems" :key="i" :data="item" :categories="allCategories" @onSelectFilter="selectFilter($event)"></AppPost>
          </sui-card-group>
          <div class="pagination">
            <AppPagination :currentPage="page" :numberOfItems="numberOfItems" :itemsPerPage="itemsPerPage" @onPageClick="setPage($event)"></AppPagination>
          </div>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <AppSidebar :categories="categories"
                      :magazines="magazines"
                      :advertisements="advertisements"
                      @onFilterSelected="selectFilter($event)"></AppSidebar>
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
      itemsPerPage: 2,
      list: true,
      showFilters: false,
      search: '',
      items: [],
      categories: [],
      magazines: [],
      advertisements: [],
      listOfCategories: ['video', 'kolumne-i-analize', 'intervjui', 'lifestyle'],
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
    numberOfItems () {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    filteredItems () {
      return this.items.filter((item, i) => {
        // console.log(((this.page - 1) * this.itemsPerPage), ((this.page * this.itemsPerPage)))
        return item.title.rendered.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 &&
        this.current.length != 0 ? _.intersection(item.categories, this.current).length != 0 : true;
      });
    },
    paginatedItems() {
      return this.filteredItems.filter((item, i) => {
          return ((i >= (this.page - 1) * this.itemsPerPage) && (i < (this.page * this.itemsPerPage)));
      })
    },
    filterFeatured () {
      return this.items.filter(item => {
        return _.intersection(item.categories, [9]).length !== 0
      })
    }
  },
  methods: {
    setPage (event) {
      if (event >= 1 && event < Math.ceil(this.items.length / this.itemsPerPage)) {
        this.page = event;
      }
    },
    selectFilter (event) {
      this.page = 1;
      this.current.push(event);
    },
    getItems () {
      axios.get('http://bih.banke-biznis.com/cms/wp-json/wp/v2/posts?_embed').then((response) => {
        this.items = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getByCategory (id, name, slug, count) {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/posts?categories=${id}&_embed`).then((response) => {
        this.categories.push({
          id: id,
          name: name,
          slug: slug,
          count: count,
          items: response.data
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    getCategories () {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/categories`).then((response) => {
        this.allCategories = response.data.map(obj => {
          return { key: obj.slug, text: obj.name, value: obj.id, count: obj.count };
        });
        response.data.forEach(category => {
          if (this.listOfCategories.filter(item => item === category.slug).length !== 0) {
            this.getByCategory(category.id, category.name, category.slug, category.count);
          }
        })
      }).catch((error) => {
        console.log(error);
      });
    },
    getMagazines () {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/magazines?_embed`).then((response) => {
        this.magazines = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getAdvertisements () {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/advertisements?_embed`).then((response) => {
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
