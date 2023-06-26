<template>
  <div class="page">
    <HeaderBar :back="false" :isShow="!swiperC" :isFixed="false" right="1/3">健康生活的我</HeaderBar>
    <table border="2">
      <tr>
        <td align="center" width="50%">体重指数(BMI)</td>
        <td align="center" width="50%">成绩:{{userInfo.weightResult}}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.weightGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">肺活量(毫升)</td>
        <td align="center" width="50%">成绩:{{userInfo.pulmonaryResult}}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.pulmonaryGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">50米跑(秒)</td>
        <td align="center" width="50%">成绩:{{ userInfo.runResult }}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.runGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">坐位体前屈(厘米)</td>
        <td align="center" width="50%">成绩:{{userInfo.anteflexionResult}}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.anteflexionGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">一分钟跳绳(次)</td>
        <td align="center" width="50%">成绩:{{userInfo.ropeSkippingResult}}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.ropeSkippingGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">一分钟仰卧起坐(次)</td>
        <td align="center" width="50%">成绩:{{userInfo.abdominalCurlResult}}&nbsp;&nbsp;&nbsp;&nbsp;等级:{{userInfo.abdominalCurlGrade}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">身高</td>
        <td align="center" width="50%">{{userInfo.stature}}CM</td>
      </tr>
      <tr>
        <td align="center" width="50%">视力</td>
        <td align="center" width="50%">左眼{{userInfo.leftNakedEye}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;右眼{{userInfo.rightNakedEye}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">屈光度</td>
        <td align="center" width="50%">左眼{{userInfo.leftDiopter}}&nbsp;&nbsp;&nbsp;&nbsp;右眼{{userInfo.rightDiopter}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">龋齿</td>
        <td align="center" width="50%">{{userInfo.opsigenes}}</td>
      </tr>
      <tr>
        <td align="center" width="50%">肥胖</td>
        <td align="center" width="50%">{{userInfo.fat}}</td>
      </tr>
    </table>
    <img src="./../../../assets/img/last.png" class="png" alt="">
  </div>
</template>

<script>
  import { mapState,mapMutations,mapActions } from 'vuex';
  export default {
    name: "page4",
    computed:{
      ...mapState('user' ,['user','year']),
    },
    props:{
      swiperC:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return{
        userInfo:{

        },
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      ...mapMutations('user', ['SET_YEAR']),
      ...mapActions('user',['getUserInfo','getYear']),
      getData(){
        if(this.user){
          if(this.user.lianhuaVision){
            this.userInfo = this.user.lianhuaVision
          }

          // this.getUserInfo({studentId:this.user,year:this.year}).then(res => {
          //   if(res.code == 1){
          //     this.userInfo = res.data.lianhuaVision;
          //     // console.log(this.userInfo)
          //   }
          // })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/common";
  .page{
    width: 100%;
    background: #FFFFFF;
    padding: 50px 25px;
    box-sizing:border-box;
    table{
      width: 100%;
      border: 1px solid #333333;
      th{
        height: 78px;
        background: #FFC336;
        font-size: 32px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 78px;
        border: 1px solid #333333;
      }
      td{
        height: 78px;
        font-size: 32px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #2D2929;
        line-height: 78px;
        border: 1px solid #333333;
      }
    }
    .png{
      width: 100%;
      object-fit: cover;
      margin-top: 30px;
    }
  }
</style>
