<template>
  <div class="page">
    <HeaderBar :back="false" :isShow="!swiperC" :isFixed="false" right="3/4">奋发学习的我</HeaderBar>
    <table>
      <tr>
        <th width="30%">科目</th>
        <th width="25%">平时</th>
        <th width="25%">期末</th>
        <th width="20%">总评</th>
      </tr>
      <tr>
        <!--        道德与法律-->
        <td align="center">道德与法制</td>
        <td align="center">{{data.moralLegalPeacetime}}</td>
        <td align="center">{{data.moralLegalPeriodEnd}}</td>
        <td align="center">{{data.moralLegalGeneral}}</td>
      </tr>
      <tr>
        <!--        语文-->
        <td align="center">语文</td>
        <td align="center">{{data.chinesePeacetime}}</td>
        <td align="center">{{data.chinesePeriodEnd}}</td>
        <td align="center">{{data.chineseGeneral}}</td>
      </tr>
      <tr>
        <!--        数学-->
        <td align="center">数学</td>
        <td align="center">{{data.mathPeacetime}}</td>
        <td align="center">{{data.mathPeriodEnd}}</td>
        <td align="center">{{data.mathGeneral}}</td>
      </tr>
      <tr>
        <!--        体育与健康-->
        <td align="center">体育与健康</td>
        <td align="center">{{data.sportsPeacetime}}</td>
        <td align="center">{{data.sportsPeriodEnd}}</td>
        <td align="center">{{data.sportsGeneral}}</td>
      </tr>
      <tr>
        <!--        音乐-->
        <td align="center">音乐</td>
        <td align="center">{{data.musicPeacetime}}</td>
        <td align="center">{{data.musicPeriodEnd}}</td>
        <td align="center">{{data.musicGeneral}}</td>
      </tr>
      <tr>
        <!--        美术-->
        <td align="center">美术</td>
        <td align="center">{{data.artPeacetime}}</td>
        <td align="center">{{data.artPeriodEnd}}</td>
        <td align="center">{{data.artGeneral}}</td>
      </tr>
      <tr>
        <!--        科学-->
        <td align="center">科学</td>
        <td align="center">{{data.sciencePeacetime}}</td>
        <td align="center">{{data.sciencePeriodEnd}}</td>
        <td align="center">{{data.scienceGeneral}}</td>
      </tr>
      <tr>
        <!--        英语-->
        <td align="center">英语</td>
        <td align="center">{{data.englishPeacetime}}</td>
        <td align="center">{{data.englishPeriodEnd}}</td>
        <td align="center">{{data.englishGeneral}}</td>
      </tr>
      <tr>
        <!--        课本课程-->
        <td align="center">校本课程</td>
        <td align="center">{{data.schoolCurriculumPeacetime}}</td>
        <td align="center">{{data.schoolCurriculumPeriodEnd}}</td>
        <td align="center">{{data.schoolCurriculumGeneral}}</td>
      </tr>
    </table>
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
        userInfo:{},
        data:{},
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      ...mapMutations('user', ['SET_YEAR']),
      ...mapActions('user',['getUserInfo','getZSM']),
      getData(){
        if(this.user){
          // this.userInfo = this.user.achievementLianhua;
          this.getZSM({studentId:this.$route.query.id,year:this.year}).then(res => {
            if(res.code == 1){
              if(res.data.achievementLianhuaDto){
                this.data = res.data.achievementLianhuaDto;
              }

            }
          })
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
  }
</style>
