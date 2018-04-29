<template>
  <section>
    <div v-swiper:myClientSwiper="swiperOption" class="my-client-swiper">
      <div class="swiper-wrapper" v-on:click="toggle">
        <div class="swiper-slide" v-for="(item, index) in clients" :key="index + 'client'">
          <img v-if="item._embedded['wp:featuredmedia'] != undefined" :src="item._embedded['wp:featuredmedia']['0'].source_url">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>

    <sui-modal v-model="open">
      <sui-modal-header>List of clients</sui-modal-header>
      <sui-modal-content>
        <div class="list-of-clients">
          <a class="client-box" v-for="(item, index) in clients" :key="index + '-client-box'" :href="item.acf.url" target="_blank">
            <img v-if="item._embedded['wp:featuredmedia'] != undefined" :src="item._embedded['wp:featuredmedia']['0'].source_url">
          </a>
        </div>
      </sui-modal-content>
      <sui-modal-actions class="actions">
        <sui-button style="margin: 0 0 10px 0" floated="right" positive @click.native="toggle">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </section>
</template>

<script>
export default {
  props: ['clients'],
  data () {
    return {
      open: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/leafs.scss';

.my-client-swiper {
  height: 150px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;

  .swiper-wrapper {
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}

.list-of-clients {
  display: flex;

  .client-box {
    width: 50%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
