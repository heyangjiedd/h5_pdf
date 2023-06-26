<template>
  <div class="entry">
    <HeaderBar v-if="isShowHeaderBar">{{title}}</HeaderBar>
    <div class="swiper-container banner-swiper" id="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in list" :key="index">
          <component :is="item.component" :data="item.data" v-if="index == nowShow"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css';
  import page1 from "@/pages/page1";
  import page2 from "@/pages/page2";
  import page3 from "@/pages/page3";
  import page4 from "@/pages/page4";
  import page5 from "@/pages/page5";
  import page6 from "@/pages/page6";
  import page7 from "@/pages/edit";
  import page8 from "@/pages/page8";
  import page9 from "@/pages/page9";
  import { mapState,mapMutations,mapActions } from 'vuex';
  export default {
    components:{
      Page1:page1,
      Page2:page2,
      Page3:page3,
      Page4:page4,
      Page7:page7,
      Page8:page8,
      Page9:page9,
    },
    name: "entry",
    data(){
      return{
        // 1611795678972
        // 3000000000042430526

        title:'我是至美少年',
        isShowHeaderBar:true,
        nowShow:0,
        list:[
          {title:'我是至美少年',component:page2,isShowHeaderBar:true},
          // {title:'品行美的我',component:page3,isShowHeaderBar:true,data:0},
          // {title:'智识美的我',component:page3,isShowHeaderBar:true,data:1},
          // {title:'身心美的我',component:page3,isShowHeaderBar:true,data:2},
          // {title:'才艺美的我',component:page3,isShowHeaderBar:true,data:3},
          // {title:'创行美的我',component:page3,isShowHeaderBar:true,data:4},
          {title:'奋发学习的我',component:page4,isShowHeaderBar:true},
          {title:'健康生活的我',component:page9,isShowHeaderBar:true},
          // {title:'艺术实践活动',component:page5,isShowHeaderBar:true},
          // {title:'期末闯关活动等级',component:page6,isShowHeaderBar:true},
          {title:'我的至美成长',component:page8,isShowHeaderBar:true},
          {title:'',component:page1,isShowHeaderBar:false},
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
      // this.getUserId();
      // console.log(this.$route)
      // swiper.slideTo(10, 1000, false)
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
