<template>
  <pSwiper :swiperC="swiperC" before="/p2" right="4/4">
    <template v-slot:body>
      <div class="page">
        <img class="school-img" src="./../assets/img/page1-schoolname.png" alt="">
        <p class="title">中小学生守则</p>
        <div class="content">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="icon-name">
              <img class="icon" src="./../assets/img/page1-triangle.png" alt="">
              <p class="name">{{item.name}}</p>
            </div>
            <p class="text">{{item.text}}</p>
          </div>
        </div>
      </div>
    </template>
  </pSwiper>
</template>

<script>
export default {
  name: "page1",
  props:{
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      list:[
        {name:'爱党爱国爱人民',text:'了解党史国情，珍视国家荣誉，热爱祖国，热爱人民，热爱中国共产党。'},
        {name:'好学多问肯钻研',text:'上课专心听讲，积极发表见解，乐于科学探索，养成阅读习惯。'},
        {name:'勤劳笃行乐奉献',text:'自己事自己做，主动分担家务，参与劳动实践，热心志愿服务。'},
        {name:'明礼守法讲美德',text:'遵守国法校纪，自觉礼让排队，保持公共卫生，爱护公共财物。'},
        {name:'孝亲尊师善待人',text:'孝父母敬师长，爱集体助同学，虚心接受批评，学会合作共处。'},
        {name:'诚实守信有担当',text:'保持言行一致，不说谎不作弊，借东西及时还，做到知错就改。'},
        {name:'自强自律健身心',text:'坚持锻炼身体，乐观开朗向上，不吸烟不喝酒，文明绿色上网。'},
        {name:'珍爱生命保安全',text:'红灯停绿灯行，防溺水不玩火，会自护懂求救，坚决远离毒品。'},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/common";
.page{
  width: 100%;
  min-height: 1624px;
  background-image: url("./../assets/img/page1-background.png");
  background-size: cover;
  padding: 24px 50px;
  box-sizing:border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .school-img{
    width: 227px;
    height: 43px;
    object-fit: cover;
  }
  .title{
    width: 480px;
    height: 112px;
    font-size: 80px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #0032AC;
    text-shadow: 0px 3px 20px #FB9C20;
    margin-top: 30px;
  }
  .content{
    width: 100%;
    height: 1361px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    background-image: url("./../assets/img/page1-cb.png");
    background-size: cover;
    padding: 20px 20px 20px 40px;
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item{
      //margin-bottom: 20px;
      .icon-name{
        display: flex;
        align-items: center;
        .icon{
          width: 29px;
          height: 36px;
          object-fit: cover;
          flex-shrink: 0;
          margin-right: 22px;
        }
        .name{
          font-size: 36px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 1;
        }
      }
      .text{
        font-size: 28px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 1.5;
        margin-top: 10px;
      }
    }
  }
}
</style>
