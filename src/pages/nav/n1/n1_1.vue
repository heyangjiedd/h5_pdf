<template>
  <div class="page">
    <HeaderBar :back="false" :isShow="!swiperC" :isFixed="false" right="1/3">品行美的我(在校表现)</HeaderBar>
    <div class="list">
      <div class="item" v-for="(item,index) in this.list" :key="index">
        <div class="top-star">
          <p class="name">{{item.name}}</p>
<!--          <div class="right-star">-->
<!--            <img class="star" src="./../../../assets/img/g-star.png" alt="">-->
<!--            <span class="num">{{item.count}}颗</span>-->
<!--          </div>-->
        </div>
        <div class="bottom-cell">
          <div class="cell">
            <img src="./../../../assets/img/g-my.png" class="img" alt="">
            <span class="num">自评 {{item.selfCount}}颗</span>
          </div>
          <div class="cell">
            <img src="./../../../assets/img/g-group.png" class="img" alt="">
            <span class="num">互评 {{item.groupCount}}颗</span>
          </div>
          <div class="cell">
            <img src="./../../../assets/img/g-teacher.png" class="img" alt="">
            <span class="num">师评 {{item.teacherCount}}颗</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
  name: "page3",
  computed:{
    ...mapState('user' ,['user','year']),
  },
  props:{
    data:{
      type:Number,
      default:0
    },
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      list:[],
      userInfo:{
        classScoreLevel2Dtos:[],
        studentBadges:[],
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    ...mapMutations('user', ['SET_YEAR']),
    ...mapActions('user',['getUserInfo','getPXM']),
    getData(){
      if(this.user){
        this.userInfo = this.user;
        this.getPXM({studentId:this.$route.query.id,year:this.year}).then(res => {
          if(res.code == 1){
            this.list = res.data.home;
          }
        })
      }
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
  @import "./../../../assets/css/common";
  .page{
    .list{
      padding: 24px;
      background-color: #F4F4F4;
      box-sizing:border-box;
      .item{
        width: 100%;
        min-height: 186px;
        background: linear-gradient(180deg, rgba(255, 195, 54, 0.20) 0%, #FFFFFF 50%);
        border-radius: 16px 16px 16px 16px;
        padding: 0 30px 40px;
        box-sizing:border-box;
        overflow: hidden;
        margin-bottom: 25px;
        .top-star{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 40px;
          .name{
            font-size: 32px;
            color: #2D2929;
            line-height: 1.5;
            max-width: 500px;
          }
          .right-star{
            display: flex;
            align-items: center;
            .star{
              width: 33px;
              height: 33px;
              object-fit: cover;
              flex-shrink: 0;
              margin-right: 7px;
            }
            .num{
              font-size: 32px;
              font-family: PingFang SC-Bold, PingFang SC;
              font-weight: bold;
              color: #2D2929;
              line-height: 1;
            }
          }
        }
        .bottom-cell{
          display: flex;
          align-items: center;
          margin-top: 20px;
          .cell{
            display: flex;
            align-items: center;
            margin-right: 100px;
            .img{
              width: 24px;
              height: 24px;
              object-fit: contain;
              margin-right: 10px;
            }
            .num{
              font-size: 28px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 1;
            }
            &:last-child{
              margin-right: 0!important;
            }
          }
        }
      }
      .all-star{
        width: 100%;
        height: 100px;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        box-sizing:border-box;
        .name{
          font-size: 32px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #2D2929;
          line-height: 1;
        }
        .right-star{
          display: flex;
          align-items: center;
          .star{
            width: 33px;
            height: 33px;
            object-fit: cover;
            flex-shrink: 0;
            margin-right: 7px;
          }
          .num{
            font-size: 32px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #2D2929;
            line-height: 1;
          }
        }
      }
      .badge-list{
        width: 100%;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;
        padding: 30px;
        box-sizing:border-box;
        opacity: 1;
        margin-top: 25px;
        .badge-name{
          font-size: 32px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #2D2929;
          line-height: 1;
        }
      }
    }
  }
</style>
