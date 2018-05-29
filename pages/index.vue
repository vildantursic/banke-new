<template>
  <section class="container">
    <sui-grid :padded="true">
      <sui-grid-row>
        <AppSlider  :featured="filterFeatured"></AppSlider>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <AppAdvertisement :large="true" :advertisement="advertisements[0]"></AppAdvertisement>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <AppAdvertisement :large="true" :advertisement="advertisements[1]"></AppAdvertisement>
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :computer="10" :mobile="16">
          <div class="search-filter-section">
            <sui-input placeholder="Pretraži..." v-model="search"/>
            <div class="buttons">
              <sui-button v-on:click="() => showFilters = !showFilters" content="Filter" icon="filter">
                <a is="sui-label" slot="label" basic>{{current.length}}</a>
              </sui-button>

              <sui-button v-if="list" v-on:click="() => list = !list" icon="th" />
              <sui-button v-if="!list" v-on:click="() => list = !list" icon="list ul" />
            </div>
          </div>
          <div v-if="showFilters" class="filters">
            <sui-dropdown fluid
                          multiple
                          v-if="allCategories.length !== 0"
                          :options="allCategories"
                          placeholder="Filters"
                          selection
                          v-model="current"/>
          </div>
          <sui-item-group divided v-if="list" :items-per-row="1">
            <AppPostList v-for="(item, i) of limitBy(filteredItems, itemsPerPage, page)" :key="i" :data="item" :categories="allCategories" @onSelectFilter="selectFilter($event)"></AppPostList>
          </sui-item-group>
          <sui-card-group v-if="!list" :items-per-row="2" :stackable="true">
            <AppPost v-for="(item, i) of limitBy(filteredItems, itemsPerPage, page)" :key="i" :data="item" :categories="allCategories" @onSelectFilter="selectFilter($event)"></AppPost>
          </sui-card-group>
          <div class="pagination">
            <AppPagination :currentPage="page" :numberOfItems="filteredItems.length" :itemsPerPage="itemsPerPage" @onPageClick="page = $event"></AppPagination>
          </div>
        </sui-grid-column>
        <sui-grid-column :computer="6" :mobile="16">
          <AppSidebar :categories="categories"
                      :magazines="magazines"
                      :advertisements="advertisements"
                      :clients="clients"
                      :clientTypes="clientTypes"
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
import AppAdvertisement from '@/components/AppAdvertisement';
import axios from 'axios';
import { intersection } from 'lodash';

export default {
  components: {
    AppSlider,
    AppPost,
    AppPostList,
    AppSidebar,
    AppPagination,
    AppAdvertisement
  },
  data () {
    return {
      loading: true,
      page: 0,
      itemsPerPage: 10,
      list: true,
      showFilters: false,
      search: '',
      items: [],
      categories: [],
      magazines: [],
      advertisements: [],
      clients: [],
      clientTypes: [],
      listOfCategories: ['video', 'kolumne-i-analize', 'intervjui', 'lifestyle'],
      current: [],
      allCategories: [],
    }
  },
  mounted () {
    this.loading = false;
    this.getCategories();
    this.getMagazines();
    this.getAdvertisements();
    this.getClients();
    this.getClientTypes();
  },
  watch: {
    search () {
      this.page = 0;
    }
  },
  computed: {
    numberOfItems () {
      return Math.ceil(this.items.length / this.page);
    },
    filteredItems () {
      return this.items.filter((item, i) => {
        return item.title.rendered.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      }).filter(item => {
        return this.current.length !== 0 ? intersection(item.categories, this.current).length !== 0 : true;
      });
    },
    filterFeatured () {
      return this.items.filter(item => {
        return intersection(item.categories, [9]).length !== 0
      })
    }
  },
  async asyncData({}) {
    return axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/posts?_embed&per_page=100`).then((response) => {
      return { items: response.data };
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    selectFilter (event) {
      this.current.push(event);
    },
    getByCategory (id, name, slug, count) {
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/posts?categories=${id}&_embed`).then((response) => {
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
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/categories`).then((response) => {
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
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/magazines?_embed`).then((response) => {
        this.magazines = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getClients () {
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/clients?_embed`).then((response) => {
        this.clients = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getClientTypes () {
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/client-types?_embed`).then((response) => {
        this.clientTypes = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getAdvertisements () {
      axios.get(`http://banke.hotelsnjesko.ba/wp-json/wp/v2/main_ads?_embed`).then((response) => {
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

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    * {
      margin-bottom: 10px;
    }
  }
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
