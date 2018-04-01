<template>
  <div v-swiper:mySwiper="swiperOption" class="my-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in featured" :key="index">
        <img v-if="item._embedded['wp:featuredmedia']" :src="item._embedded['wp:featuredmedia']['0'].source_url">
        <div class="content">
          <div class="title" data-swiper-parallax="-100">{{item.title.rendered}}</div>
          <div class="subtitle" data-swiper-parallax="-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
  export default {
    props: ['featured'],
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
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
    mounted() {
    }
  }
</script>


<style lang="scss" scoped>
  .my-swiper {
    height: 500px;
    width: 100%;
    overflow: hidden;
    .swiper-wrapper {
      .swiper-slide {
        text-align: center;
        font-size: 38px;
        font-weight: 700;
        background-color: #eee;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      position: absolute;
      z-index: 1;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      z-index: 2;

      .title {
        font-size: 41px;
        font-weight: 300;
      }
      .subtitle {
        font-size: 21px;
      }
    }
  }
</style>
