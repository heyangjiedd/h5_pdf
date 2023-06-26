<template>
  <pSwiper :swiperC="swiperC" before="/p1" next="/p2">
    <template v-slot:header>
      <HeaderBar :isFixed="swiperC" right="2/4">至美成长轨迹</HeaderBar>
    </template>
    <template v-slot:body>
      <div class="page">
        <div class="nav">
          <div class="navItem" v-for="(item,index) in navList" :key="index" @click="href(item,index)">
            <img :src="item.img" class="img" alt="">
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </template>

  </pSwiper>
</template>

<script>
export default {
  name: "nav",
  props:{
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      navList:[
        {name:'品行美',img:require('@/assets/img/nav/n1.png'),type:'n1'},
        {name:'智识美',img:require('@/assets/img/nav/n2.png'),type:'n2'},
        {name:'身心美',img:require('@/assets/img/nav/n3.png'),type:'n3'},
        {name:'才艺美',img:require('@/assets/img/nav/n4.png'),type:'n4'},
        {name:'创行美',img:require('@/assets/img/nav/n5.png'),type:'n5'},
      ]
    }
  },
  methods:{
    href(item,index){
      this.$router.push({path:`/${item.type}`,query:this.$route.query})
    }
  }
}
</script>

<style lang="scss" scoped>
  .page{
    min-height: 100vh;
    position: relative;
    .nav{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      padding-top: 60px;
      box-sizing:border-box;
      .navItem{
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 60px;
        .img{
          width: 117px;
          height: 117px;
          border-radius: 20px;
          opacity: 1;
          object-fit: cover;
        }
        .name{
          font-size: 32px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 1;
          margin-top: 20px;
        }
      }
    }
  }
</style>
