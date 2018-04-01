<template>
  <section class="container">
    <sui-grid celled>
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
        <sui-grid-column :width="10">
          <div class="">
            <div class="image">
              {{post.title.rendered}}
            </div>
            <div v-html="post.content.rendered"></div>
          </div>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <div class="ui banner test ad" data-text="Banner"></div>
          <AppArticle></AppArticle>
          <div class="ui banner test ad" data-text="Banner"></div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </section>
</template>

<script>
import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import AppArticle from '@/components/AppArticle';
import axios from 'axios';
import moment from 'moment';

Vue.use(SuiVue);

export default {
  components: {
    AppArticle
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
      }
    }
  },
  async asyncData ({ req, params }) {
    return axios.get(`http://localhost/banke-new-cms/wp-json/wp/v2/posts/${params.id}?_embed`).then((response) => {
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

</style>
