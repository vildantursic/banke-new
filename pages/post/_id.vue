<template>
  <section class="container">
    <sui-grid>
      <sui-grid-row>
        <div class="header">
          <img v-if="post._embedded['wp:featuredmedia'] != undefined" :src="post._embedded['wp:featuredmedia']['0'].source_url" alt="">
          <div v-if="post._embedded['wp:featuredmedia'] == undefined" class="logo">
            Banke <span class="and">&</span> Biznis
          </div>
          <div class="title">
           <div>
             <h1 style="word-break: normal">{{ post.title.rendered }}</h1>
           </div>
           <div>
             <p class="date"><b>Objavljeno: </b> {{ post.date | formatDate }}
             </p>
           </div>
         </div>
        </div>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column class="post-content" :computer="10" :mobile="16">
          <div class="">
            <social-sharing url="http://bih.banke-biznis.com/news/fipabosnaihercegovina"
                      title="post.title.rendered"
                      description="post.acf.subtitle"
                      quote="post.acf.subtitle"
                      hashtags="banke,biznis,blog"
                      twitter-user="banke-biznis"
                      inline-template>
              <div>
                  <network network="email">
                      <i class="fa fa-envelope"></i> Email
                  </network>
                  <network network="facebook">
                    <i class="fa fa-facebook"></i> Facebook
                  </network>
                  <network network="linkedin">
                    <i class="fa fa-linkedin"></i> LinkedIn
                  </network>
                  <network network="twitter">
                    <i class="fa fa-twitter"></i> Twitter
                  </network>
              </div>
            </social-sharing>
          </div>
          <div class="">
            <div v-html="post.content.rendered"></div>
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
import AppArticle from '@/components/AppArticle';
import AppSidebar from '@/components/AppSidebar';
import axios from 'axios';
import moment from 'moment';

export default {
  components: {
    AppArticle,
    AppSidebar
  },
  data () {
    return {
      post: {
        title: {
          rendered: ''
        },
        content: {
          rendered: ''
        }
      },
      items: [],
      categories: [],
      magazines: [],
      advertisements: [],
      listOfCategories: ['video', 'kolumne-i-analize', 'intervjui', 'lifestyle']
    }
  },
  created () {
    this.getItems();
    this.getCategories();
    this.getMagazines();
    this.getAdvertisements();
  },
  async asyncData ({ req, params }) {
    return axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/posts/${params.id}?_embed`).then((response) => {
      console.log(response.data);
      return { post: response.data }
    })
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  methods: {
    getItems () {
      axios.get('http://bih.banke-biznis.com/cms/wp-json/wp/v2/posts?_embed').then((response) => {
        this.items = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getByCategory (id, name, slug) {
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/posts?categories=${id}&_embed`).then((response) => {
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
      axios.get(`http://bih.banke-biznis.com/cms/wp-json/wp/v2/categories`).then((response) => {
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
@import '../../assets/leafs.scss';

.container {
  min-height: 100vh;
  @extend .page-size;
}

.header {
  grid-area: header;
  width: 100%;
  min-height: 300px;
  position: relative;
  display: flex;
  height: 600px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #222222;

  @media (max-width: 768px) {
    height: 100vh;
  }

  .image {
    height: 100%;
  }

  .title {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(255,255,255,0.8);
    height: auto;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .date {
      padding-top: 5px;
      float: right;
    }
  }
}

.post-content {
  width: 100%;
  overflow: hidden;
  font-size: 1.2em;
}
</style>
