<template>
  <pSwiper :swiperC="swiperC" before="" next="/nav">
    <template v-slot:header>
      <HeaderBar :back="false" :isFixed="swiperC" right="1/4">我是至美少年</HeaderBar>
    </template>
    <template v-slot:body>
      <div class="page" id="capture">
        <div class="dropdown-menu">
          <div class="menu" @click="isDrop = !isDrop">
            <p class="select-text">{{year}}</p>
            <i class="iconfont icon-keyboardarrowdown"></i>
            <img src="./../assets/img/download.png"  @click.stop="save()" class="download" alt="">
          </div>
          <div :class="'drop ' + (isDrop ? 'show' : 'hidden')">
            <div :class="`item ${(year == item.year ? 'active' : '')}`" v-for="(item,index) in yearList" @click="selectYear(item,index)" :key="index">
              <p class="text">{{item.year}}</p>
              <i class="iconfont icon-done" ></i>
            </div>
          </div>
        </div>
        <div class="user-info">
          <div class="user-mes">
            <div class="u-m-l">
              <div class="user-name">
                <span>姓名：{{userInfo.name}}</span>
                <!--            <img src="./../assets/img/user-woman.png" class="gender" alt="">-->
              </div>
              <span class="user-other">民族：{{userInfo.nation}}</span>
              <span class="user-other">生日：{{userInfo.birthday}}</span>
              <span class="user-other">入学时间：{{userInfo.admissionTime}}</span>
              <span class="user-other">现在班级：{{userInfo.className}}</span>
            </div>
            <img :src="getBase64Img(userInfo.mobileAvatar)" :id="userInfo.mobileAvatar" class="u-m-r" alt="">
          </div>
          <div class="all-star">
            <p>总星数：</p>
            <span>{{userInfo.totalBadge}}星</span>
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
                    <img :src="getBase64Img(item.url,`p1${index}`)" :id="`p1${index}`" alt="" />
                  </div>
                  <p class="name">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <!--      <div class="title">我入队了！</div>-->
          {{userInfo.studentInfoLianhua.homepage}}
        </div>
        <img  class="content-img" :src="getBase64Img(userInfo.studentInfoLianhua.homepageUrl)" :id="userInfo.studentInfoLianhua.homepageUrl" alt="">
        <img src="./../assets/img/edit.png" v-if="isEdit" @click="$router.push('/edit')" class="edit" alt="">
        <div id="print"></div>
      </div>
    </template>
  </pSwiper>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
import { getBase64 } from "@/assets/js/common";
import html2canvas from 'html2canvas';
import request from "@/assets/js/request";
// import { jsPDF } from "jspdf";
export default {
  name: "page2",
  props:{
    swiperC:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    ...mapState('user' ,['user','year']),
    getImg:function(){
      if(this.userInfo.studentInfoLianhua.homepageUrl){
        return this.userInfo.studentInfoLianhua.homepageUrl.split(',')
      }
      return []
    },
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
      isDrop: false,
      isEdit:false,
      zm:'',
      yearList:[],
      userInfo:{
        studentBadgeVos:[],
        studentInfoLianhua:{}
      },
    }
  },
  updated() {

  },
  mounted() {
    this.getYearList();
  },
  methods:{
    ...mapMutations('user', ['SET_USER','SET_YEAR']),
    ...mapActions('user',['getUserInfo','getYear','isExit']),
    getYearList(){
      // this.isExit().then(res=>{
      //   if(res.code == 1){
      //     this.isEdit = Boolean(res.data);
      //   }
      // })
      const uid = this.getUserId();
      this.getYear({studentId:uid}).then(res=>{
        if(res.code == 1){
          this.yearList = res.data;
          this.selectYear(this.yearList[0])
          this.getData()
        }
      })
    },
    getData(){
      const uid = this.getUserId();
      if(uid){
        this.getUserInfo({studentId:uid,year:this.year}).then(async res => {
          if(res.code == 1){
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
    selectYear(item){
      console.log(item)
      this.SET_YEAR(item.year);
      this.isDrop = false;
      this.getData();
      this.isEdit = item.isExit == 1 ? true : false;
      console.log(this.isEdit)
    },
    show(item){
      if(item){
        return item.count
      }
      return false
    },
    save(){
      this.$router.push({path:'/print',query:this.$route.query})
      // html2canvas(document.querySelector("#capture"),{ allowTaint: true,}).then(canvas => {
      //   let scale = 2;
      //   const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
      //   //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
      //   const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
      //   doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
      //   doc.save("test.pdf"); //保存PDF
      // });
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
    getName(item){
      if(item){

        return item.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/common";
.page{
  background-color: #F4F4F4;
  padding:0 24px;
  box-sizing:border-box;
  position: relative;
  .dropdown-menu{
    width: 100%;
    position: relative;
    height: 100px;
    .menu{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
      background-color: #F4F4F4;
      .select-text{
        font-size: 32px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #2D2929;
        line-height: 1;
      }
      .iconfont{
        font-size: 40px;
        margin-left: 10px;
      }
    }
    .drop{
      width: 100%;
      padding:0 20px;
      box-sizing:border-box;
      background-color: #FFFFFF;
      position: absolute;
      z-index: 0;
      box-shadow: 0px 5px 10px -10px #5b5b5b;
      .item{
        width: 100%;
        padding: 30px 0;
        border-bottom: 1px solid #cdcdcd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #2D2929;
        .text{
          font-size: 26px;
        }
        .iconfont{
          font-size: 26px;
          display: none;
        }
        &:last-child{
          border-bottom: none;
        }
        &.active{
          color: #FB9C20!important;
          .iconfont{
            display: block;
          }
        }
      }
    }
    .show{
      transform: translateY(0%);
      transition: all .5s ease-in-out;
    }
    .hidden{
      transform: translateY(-100%);
      transition: all .5s ease-in-out;
    }
    .download{
      width: 50px;
      height: 50px;
      position: absolute;
      right: 25px;
    }
  }
  .user-info{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px 16px 16px 16px;
    opacity: 1;
    padding: 54px 20px;
    box-sizing:border-box;
    overflow: hidden;
    .user-mes{
      display: flex;
      justify-content: space-between;
      .u-m-l{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .user-name{
          font-size: 32px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #2D2929;
          line-height: 1;
          display: flex;
          align-items: center;
          .gender{
            width: 40px;
            height: 40px;
            object-fit: cover;
            margin-left: 15px;
          }
        }
        .user-other{
          font-size: 26px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 1;
        }
      }
      .u-m-r{
        width: 198px;
        height: 255px;
        border-radius: 19px 19px 19px 19px;
        opacity: 1;
        border: 1px solid #707070;
        //background-color: #2D2929;
      }
    }
    .all-star{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      p{
        font-size: 28px;
        font-weight: 400;
        color: #010101;
        line-height: 1;
      }
      span{
        font-size: 28px;
        color: #FFC336;
        line-height: 1;
      }
    }
    .badge{
      font-size: 28px;
      font-weight: 400;
      color: #010101;
      line-height: 1;
      margin-top: 10px;
    }
    .badgeList{
      width: 100%;
      background: #F4F4F4;
      border-radius: 22px 22px 22px 22px;
      opacity: 1;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      padding:0 15px 40px;
      box-sizing:border-box;

    }
  }
  .title{
    font-size: 32px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #2D2929;
    line-height: 1;
    border-left: 10px solid #FFC336;
    padding-left: 20px;
    margin-bottom: 20px;
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
  .content-img{
    width: 100%;
    //height: 396px;
    //background: #B9B9B9;
    border-radius: 16px 16px 16px 16px;
    opacity: 1;
    margin-top: 25px;
  }
  .edit{
    position: absolute;
    width: 158px;
    height: 158px;
    right: 0;
    top: 40%;
    object-fit: cover;
  }
}
</style>
