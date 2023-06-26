<template>
  <div class="page">
    <HeaderBar :back="false" :isShow="!swiperC" :isFixed="false" right="1/2">勇于实践的我</HeaderBar>
    <div class="content" v-for="(item,index) in data" :key="index">
      <p class="text">{{item.content}}</p>
      <img class="img" :key="index" :src="getBase64Img(item.url,`n5_1${index}`)" :id="`n5_1${index}`" alt="">
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
import {getBase64} from "@/assets/js/common";
export default {
  name: "page6",
  computed:{
    ...mapState('user' ,['user','year']),
    getImg:function(){
      if(this.data.artLevelUrl){
        return this.data.artLevelUrl.split(',');
      }
      return []
    },
  },
  props:{
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      data:{},
      userInfo:{
        studentInfoLianhua:{}
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    ...mapMutations('user', ['SET_YEAR']),
    ...mapActions('user',['getUserInfo','getCXM']),
    getData(){
      if(this.user){
        this.userInfo = this.user;
        this.getCXM({studentId:this.$route.query.id,year:this.year}).then(res => {
          if(res.code == 1){
            this.data = res.data.list;
          }
        })
      }
    },
    async getBase64Img(imgUrl,id) {
      if(imgUrl){
        const base64 = await getBase64(imgUrl);
        this.$nextTick(()=>{
          if(id){
            document.getElementById(id).src = base64
          }
          else{
            document.getElementById(imgUrl).src = base64
          }
        })
      }
      else{
        return ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./../../../assets/css/common";
.page{
  width: 100%;
  background: #F4F4F4;
  padding: 25px;
  box-sizing:border-box;
  .content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px 16px 16px 16px;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 30px;
    .text{
      font-size: 28px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #2D2929;
      line-height: 1.5;
    }
    .img{
      width: 100%;
      height: 352px;
      background: #B9B9B9;
      border-radius: 16px 16px 16px 16px;
      object-fit: cover;
      margin-top: 20px;
      display: block;
    }
  }
}
</style>
