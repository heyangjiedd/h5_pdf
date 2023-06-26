<template>
  <pSwiper :swiperC="swiperC" before="/nav" next="/p3">
    <template v-slot:header>
      <HeaderBar :isFixed="swiperC" right="3/4">我的至美成长</HeaderBar>
    </template>
    <template v-slot:body>
      <div class="page">
        <div class="badge">我的至美成长寄语</div>
        <div class="content">{{userInfo.studentInfoLianhua.studentIntroduce}}</div>
        <div class="badge">家长至美成长寄语</div>
        <div class="content">{{userInfo.studentInfoLianhua.teacherMessage}}</div>
        <div class="badge">班主任至美成长寄语</div>
        <div class="content">{{userInfo.studentInfoLianhua.teacherComment}}</div>
        <div class="starDiv">
          <p class="left">总星星数</p>
          <p class="right">{{userInfo.totalBadge}}颗</p>
        </div>
        <div class="badge">获得徽章</div>
        <div class="badgeList">
          <div class="zm" v-if="getZm">
            <div class="badge-item">
              <div class="icon">
                <div class="bage">+{{getZm.count}}</div>
                <img src="@assets/img/zhimeishaonian.png" alt="">
              </div>
              <p class="name">至美少年</p>
            </div>
          </div>
          <div class="bl">
            <div class="badge-item" v-for="(item,index) in userInfo.studentBadgeVos" :key="index">
              <div class="in" v-if="item.name != '至美少年' && item">
                <div class="icon">
                  <div class="bage">+{{item.count}}</div>
                  <img :src="getBase64Img(item.url,`p2${index}`)" :id="`p2${index}`" alt="">
                </div>
                <p class="name">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="pls"><span style="color: red">*</span>{{userInfo.introduce}}</p>
<!--        <p class="pls"><span style="color: red">*</span>本学期上课90天。假期自2022年7月1 日起至2022年8月30日止。下学期定于2022年8月31日注册。</p>-->
      </div>
    </template>
  </pSwiper>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
import {getBase64} from "@/assets/js/common";
export default {
  name: "page6",
  props:{
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    ...mapState('user' ,['user','year']),
    getZm:function(){
      if(this.userInfo.studentBadgeVos){
        let isfind = this.userInfo.studentBadgeVos.find((value,index) => {
          return value.name == '至美少年'
        });
        return isfind;
      }
      else{
        return false
      }
    }
  },
  data(){
    return{
      zm:'',
      userInfo:{
        studentInfoLianhua:{},
        studentBadgeVos:[],
        introduce:'',
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    ...mapMutations('user', ['SET_YEAR','SET_USER']),
    ...mapActions('user',['getUserInfo','getYear']),
    getData(){
      if(this.user){
        // this.userInfo = this.user;
        // this.user.studentBadgeVos.map(async (value,index) => {
        //   if(value.name == '至美少年'){
        //     // this.userInfo.studentBadgeVos.splice(index,1);
        //     this.zm = value;
        //   }
        // });
        const uid = this.getUserId();
        this.getUserInfo({studentId:uid,year:this.year}).then(res => {
          if(res.code == 1){
            this.userInfo = res.data;
            if(!res.data.studentBadgeVos){
              res.data.studentBadgeVos = []
            }
            if(!res.data.studentInfoLianhua){
              res.data.studentInfoLianhua = {}
            }
            this.userInfo = res.data;
            this.SET_USER(this.userInfo);
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
    getUserId(){
      const userId = this.$route.query.id || this.$route.query.ID || this.$route.query.Id;
      return userId;
    },
    show(item){
      if(item){
        return item.count
      }
      return false
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/common";
.page{
  width: 100%;
  background: #F4F4F4;
  padding:0 25px;
  box-sizing:border-box;
  overflow: hidden;
  position: relative;
  .badge{
    font-size: 32px;
    font-weight: 400;
    color: #010101;
    line-height: 1;
    margin: 30px 0 25px;
  }
  .content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px 16px 16px 16px;
    opacity: 1;
    padding: 30px;
    box-sizing:border-box;
    font-size: 28px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #2D2929;
    line-height: 1.5;
    margin-top: 24px;
  }
  .starDiv{
    width: 100%;
    height: 100px;
    background: #FFFFFF;
    border-radius: 16px 16px 16px 16px;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      font-size: 32px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #2D2929;
      line-height: 1;
    }
    .right{
      font-size: 32px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #2D2929;
    }
  }
  .badgeList{
    background-color: #FFFFFF!important;
  }
  .pls{
    font-size: 24px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 1.5;
    margin-top: 20px;
  }
}
</style>
