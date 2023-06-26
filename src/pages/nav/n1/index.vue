<template>
  <div class="entry">
    <HeaderBar v-if="isShowHeaderBar"  :back="true" :right="`${nowShow+1}/3`">{{title}}</HeaderBar>
    <div class="swiper-container banner-swiper" id="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in list"  :key="index">
          <component :swiperC="true" :is="item.component" :data="item.data" v-if="index == nowShow"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';

import 'swiper/css/swiper.min.css';
import n1_1 from "./n1_1";
import n1_2 from "./n1_2";
import n1_3 from "./n1_3";

import { mapState,mapMutations,mapActions } from 'vuex';
export default {
  components:{
    n1_1:n1_1,
    n1_2:n1_2,
    n1_3:n1_3,
  },
  name: "entry",
  data(){
    return{
      // 1611795678972
      // 3000000000047381367
      title:'品行美的我(在校表现)',
      isShowHeaderBar:true,
      nowShow:0,
      list:[
        {title:'品行美的我(在校表现)',component:n1_1,isShowHeaderBar:true},
        {title:'品行美的我(在家表现)',component:n1_2,isShowHeaderBar:true},
        {title:'本学期品行星获得明细',component:n1_3,isShowHeaderBar:true},

      ],
    }
  },
  mounted() {
    const swiper = new Swiper('.banner-swiper',{})
    const _this = this;
    swiper.on("slideChange", function(){
      const item = _this.list[this.activeIndex];
      _this.title = item.title;
      _this.isShowHeaderBar = item.isShowHeaderBar;
      _this.nowShow = this.activeIndex;
    });

  },
  methods:{
    ...mapMutations('user', ['SET_USER']),
    ...mapActions('user',['getUserInfo','getYear']),

    getUserId(){
      const userId = this.$route.query.id || this.$route.query.ID || this.$route.query.Id;
      this.SET_USER(userId);
    },
  },
  watch:{
    '$route':function (n,o){
      console.log(n,o)
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrapper{

}
</style>
