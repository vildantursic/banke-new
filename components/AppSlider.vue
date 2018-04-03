<template>
  <div v-swiper:mySwiper="swiperOption" class="my-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in featured" :key="index">
        <img v-if="item._embedded['wp:featuredmedia'] != undefined" :src="item._embedded['wp:featuredmedia']['0'].source_url">
        <div class="content">
          <svg class="slide__overlay" viewBox="0 0 720 405" preserveAspectRatio="xMaxYMax slice">
            <path class="slide__overlay-path" d="M0,0 150,0 400,405 0,405" />
          </svg>
          <div class="slide__text">
            <div class="title" data-swiper-parallax="-100">{{item.title.rendered}}</div>
            <div class="subtitle" data-swiper-parallax="-200">
              {{item.acf.supertitle}}
            </div>
            <router-link :to="{ name: 'post-id', params: { id: item.id } }">
              <sui-button color="black" inverted>Procitaj vise</sui-button>
            </router-link>
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
      width: 100%;
      height: 100%;
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

  .slide__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    min-height: 810px;
    transition: transform 0.5s 0.5s, opacity 0.2s 0.5s;
    // will-change: transform, opacity;
    // transform: translate3d(-20%, 0, 0);
    // opacity: 0;


    path {
      opacity: 0.8;
    }
  }

  .slide__text {
    position: absolute;
    top: 0;
    left: 10%;
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    color: white;

    .title {
    }
    .subtitle {
      margin: 25px 0;
    }
  }

  .slide__overlay-path {
    fill: rgba(255, 113, 0, 0.8);
  }
</style>
