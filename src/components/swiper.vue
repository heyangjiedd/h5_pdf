<template>
  <div>
    <div class="entry">
      <slot name="header"></slot>
      <div class="swiper-container banner-swiper" id="mySwiper" v-if="swiperC">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-if="before"></div>
          <div class="swiper-slide">
            <slot name="body"></slot>
          </div>
          <div class="swiper-slide" v-if="next"></div>
        </div>
      </div>
      <slot name="body" v-else></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  name: "swiper",
  props:{
    before:{
      type:String,
      default: null
    },
    next:{
      type:String,
      default: null
    },
    swiperC:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      swiper:null,
    }
  },
  mounted() {
    console.log(this.swiperC)
    if(this.swiperC){
      this.initSwiper()
    }

  },
  methods:{
    initSwiper(){
      const swiper = new Swiper('.banner-swiper',{observeParents: true,observer: true,})
      const _this = this;
      if(!this.before){
        swiper.slideTo(0, 0, false)
      }
      else{
        swiper.slideTo(1, 0, false)
      }
      swiper.on("slideChange", function(){
        const index = this.activeIndex;
        if(_this.before && index == 0){
          _this.$router.push({path:_this.before,query:_this.$route.query});
          return
        }
        if(_this.next && (index == 1 || index == 2)){
          _this.$router.push({path:_this.next,query:_this.$route.query});
          return
        }
      });
      this.swiper = swiper;
    },
  },
  watch:{
    'swiperC':function (n,o){
      if(n){
        this.initSwiper()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
