<template>
  <div class="page">
    <HeaderBar :back="true">我的至美成长</HeaderBar>

    <p class="title">我的至美成长寄语</p>
    <textarea v-model="form.studentIntroduce" placeholder="学生填写" name="" id="" cols="30" rows="10"></textarea>

    <p class="title">家长至美成长寄语</p>
    <textarea v-model="form.teacherMessage" placeholder="家长填写" name="" id="" cols="30" rows="10"></textarea>

    <p class="title">少先队文字图片上传</p>
    <textarea v-model="form.homepage" placeholder="请输入" name="" id="" cols="30" rows="10"></textarea>
    <div class="img-list">
      <div class="img-item" v-for="(item,index) in form.homepageUrl" :key="index">
        <img :src="item" alt="">
        <div class="del" @click="del('homepageUrl',index)">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
      <van-uploader :after-read="addhomepageUrlList" :multiple="false" :max-count="1" v-if="form.homepageUrl.length < 1">
        <div class="add">
          <img src="./../assets/img/add.png" alt="">
        </div>
      </van-uploader>
    </div>

    <p class="title">期末闯关</p>
    <textarea v-model="form.artLevel" placeholder="请输入" name="" id="" cols="30" rows="10"></textarea>
    <div class="img-list">
      <div class="img-item" v-for="(item,index) in form.artLevelUrl" :key="index">
        <img :src="item" alt="">
        <div class="del" @click="del('artLevelUrl',index)">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
      <van-uploader :after-read="addartLevelUrlList" :multiple="false" :max-count="1" v-if="form.artLevelUrl.length < 1">
        <div class="add">
          <img src="./../assets/img/add.png" alt="">
        </div>
      </van-uploader>
    </div>

    <p class="title">努力成长的我</p>
    <p class="content">这一学期，我学习到了一项才艺,完成了二个有趣的小制作,画了一幅满意的画,制作了有创意的小发明，完成了一张令我满意的答卷,各类获奖证书……这些，我都会放入我的成长记录袋中小心地珍藏。下面登记的是我的成长记录袋中的精品。</p>
    <div v-for="(item,index) in form.strive" :key="index">
      <textarea v-model="item.content" placeholder="请输入" name="" id="" cols="30" rows="10"></textarea>
      <div class="img-list">
        <div class="img-item" v-if="item.url">
          <img :src="item.url" alt="">
          <div class="del" @click="delUrl('strive',index)">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <van-uploader :after-read="addstriveList(index)" :multiple="false" :max-count="1" v-else>
          <div class="add">
            <img src="./../assets/img/add.png" alt="">
          </div>
        </van-uploader>
      </div>
      <div class="delItem" v-if="index > 0" @click="delItem('strive',index)">
        <img src="./../assets/img/del.png" alt="">
      </div>
    </div>
    <button class="addItem" @click="addItem('strive')">
      添加
    </button>

    <p class="title">勇于实践的我</p>
    <p class="content">学习之余,我还积极参加各项活动,比如:主题班会、科技文体竞赛、雏鹰争章、参观游览……这些活动开拓了我的视野,丰富了我的知识,锻炼了我的能力。下面填写的是我印象最深的活动。</p>
    <div v-for="(item,index) in form.practice" :key="index">
      <textarea v-model="item.content" placeholder="请输入" name="" id="" cols="30" rows="10"></textarea>
      <div class="img-list">
        <div class="img-item" v-if="item.url">
          <img :src="item.url" alt="">
          <div class="del" @click="delUrl('practice',index)">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <van-uploader :after-read="addpracticeList(index)" :multiple="false" :max-count="1" v-else>
          <div class="add">
            <img src="./../assets/img/add.png" alt="">
          </div>
        </van-uploader>
      </div>
      <div class="delItem" v-if="index > 0" @click="delItem('practice',index)">
        <img src="./../assets/img/del.png" alt="">
      </div>
    </div>
    <button class="addItem" @click="addItem('practice')">
      添加
    </button>
    <!--<p style="padding: 20px 0;color: #2D2929;font-size: 16px">品行美的我(在校表现) <span style="font-size: 12px;color: #5b5b5b">只能填写345</span></p>-->
    <!--<div class="list">-->
      <!--<div class="item" v-for="(item,index) in list1" :key="index">-->
        <!--<div class="top-star">-->
          <!--<p class="name">{{item.name}}</p>-->
        <!--</div>-->
        <!--<div class="bottom-cell">-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-my.png" class="img" alt="">-->
            <!--<span class="num">自评 {{item.selfCount}}颗</span>-->
          <!--</div>-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-group.png" class="img" alt="">-->
            <!--<span class="num">互评 {{item.groupCount}}颗</span>-->
          <!--</div>-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-teacher.png" class="img" alt="">-->
            <!--<span class="num">师评 {{item.teacherCount}}颗</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="input-cell">-->
          <!--<div class="input"><span>自评：</span><input type="number" maxlength="3" v-model="item.selfCount" @input="fore($event,item,'selfCount')"/></div>-->
          <!--<div class="input"><span>互评：</span><input type="number" maxlength="3" v-model="item.groupCount" @input="fore($event,item,'groupCount')"></div>-->
          <!--<div class="input"><span>师评：</span><input type="number" maxlength="3" v-model="item.teacherCount" @input="fore($event,item,'teacherCount')"></div>-->
        <!--</div>-->
<!--&lt;!&ndash;        if(!/^[3-5]$/.test(e.value)){e.value='';item.selfCount = ''}&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <!--<p style="padding: 20px 0;color: #2D2929;font-size: 16px">品行美的我(在家表现) <span style="font-size: 12px;color: #5b5b5b">只能填写345</span></p>-->
    <!--<div class="list">-->
      <!--<div class="item" v-for="(item,index) in list2" :key="index">-->
        <!--<div class="top-star">-->
          <!--<p class="name">{{item.name}}</p>-->
        <!--</div>-->
        <!--<div class="bottom-cell">-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-my.png" class="img" alt="">-->
            <!--<span class="num">自评 {{item.selfCount}}颗</span>-->
          <!--</div>-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-group.png" class="img" alt="">-->
            <!--<span class="num">家长评 {{item.count}}颗</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="input-cell">-->
          <!--<div class="input"><span>自评：</span><input type="number" maxlength="3" v-model="item.selfCount" @input="fore($event,item,'selfCount')"></div>-->
          <!--<div class="input"><span>家长评：</span><input type="number" maxlength="3" v-model="item.count" @input="fore($event,item,'count')"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<p style="padding: 20px 0;color: #2D2929;font-size: 16px">良好习惯的我 <span style="font-size: 12px;color: #5b5b5b">只能填写345</span></p>-->
    <!--<div class="list">-->
      <!--<div class="item" v-for="(item,index) in list3" :key="index">-->
        <!--<div class="top-star">-->
          <!--<p class="name">{{item.name}}</p>-->
        <!--</div>-->
        <!--<div class="bottom-cell">-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-my.png" class="img" alt="">-->
            <!--<span class="num">自评 {{item.selfCount}}颗</span>-->
          <!--</div>-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-group.png" class="img" alt="">-->
            <!--<span class="num">互评 {{item.groupCount}}颗</span>-->
          <!--</div>-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-teacher.png" class="img" alt="">-->
            <!--<span class="num">师评 {{item.teacherCount}}颗</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="input-cell">-->
          <!--<div class="input"><span>自评：</span><input type="number" maxlength="3" v-model="item.selfCount" @input="fore($event,item,'selfCount')"></div>-->
          <!--<div class="input"><span>互评：</span><input type="number" maxlength="3" v-model="item.groupCount" @input="fore($event,item,'groupCount')"></div>-->
          <!--<div class="input"><span>师评：</span><input type="number" maxlength="3" v-model="item.teacherCount" @input="fore($event,item,'teacherCount')"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<p style="padding: 20px 0;color: #2D2929;font-size: 16px">阳光向上的我 <span style="font-size: 12px;color: #5b5b5b">只能填写345</span></p>-->
    <!--<div class="list">-->
      <!--<div class="item" v-for="(item,index) in list4" :key="index">-->
        <!--<div class="top-star">-->
          <!--<p class="name">{{item.name}}</p>-->
        <!--</div>-->
        <!--<div class="bottom-cell">-->
          <!--<div class="cell">-->
            <!--<img src="./../assets/img/g-my.png" class="img" alt="">-->
            <!--<span class="num">自评 {{item.selfCount}}颗</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="input-cell">-->
          <!--<div class="input"><span>自评：</span><input type="number" maxlength="3" v-model="item.selfCount" @input="fore($event,item,'selfCount')"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="fixed">
      <button class="submit" @click="submit()">
        保存
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState,mapMutations,mapActions } from 'vuex';
  import { Toast } from 'vant';
  import { cloneDeep } from 'lodash';
  export default {
    name: "page7",
    computed:{
      ...mapState('user' ,['user','year']),
    },
    data(){
      return{
        form:{
          year:'',
          studentIntroduce:'',
          teacherMessage:'',
          homepage:'',
          homepageUrl:[],
          artLevel:'',
          artLevelUrl:[],
          strive:[
            {content:'',url:''}
          ],
          practice:[
            {content:'',url:''}
          ],
        },
        list1:[],
        list2:[],
        list3:[],
        list4:[],
      }
    },
    mounted(){
      if(this.user){
        this.getUserInfo({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
          if(res.code == 1){
            let user = res.data.studentInfoLianhua;
            this.form.studentIntroduce = user.studentIntroduce;
            this.form.teacherMessage = user.teacherMessage;
            this.form.homepage = user.homepage;
            this.form.artLevel = user.artLevel;
            this.form.homepageUrl = user.homepageUrl.split(',');
            this.form.artLevelUrl = user.artLevelUrl.split(',');
          }
        })
        this.getCYM({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
          if(res.code == 1){
            this.form.strive = res.data.list;
          }
        })
        this.getCXM({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
          if(res.code == 1){
            this.form.practice = res.data.list;
          }
        })
        this.getListData();
      }
    },
    methods:{
      ...mapActions('user',['postFile','submitData','getUserInfo','getYear','getCYM','getCXM','getPXM','getZSM','getSXM']),
      fore(e,data,key){
        if(!/^[3-5]$/.test(e.target.value)){
          data[key] = '';
        }
        else{
          data[key] = e.target.value
        }
      },
      //少先队图片上传
      addhomepageUrlList(file){
        this.checkSize(file,()=>{
          let fm = new FormData();
          fm.append('file',file.file);
          this.postFile(fm).then(res=>{
            if(res.data.code == 1){
              this.form.homepageUrl.push(res.data.data)
            }
          })
        })

      },
      //期末闯关图片上传
      addartLevelUrlList(file){
        this.checkSize(file,()=>{
          let fm = new FormData();
          fm.append('file',file.file);
          this.postFile(fm).then(res=>{
            if(res.data.code == 1){
              this.form.artLevelUrl.push(res.data.data)
            }
          })
        })
      },
      //努力成长的我图片上传
      addstriveList(index){
        return (file) => {
          this.checkSize(file,()=>{
            let fm = new FormData();
            fm.append('file',file.file);
            this.postFile(fm).then(res=>{
              if(res.data.code == 1){
                this.form.strive[index].url = res.data.data;
              }
            })
          })
        }
      },
      //勇于实践的我图片上传
      addpracticeList(index){
        return (file) => {
          this.checkSize(file,()=>{
            let fm = new FormData();
            fm.append('file',file.file);
            this.postFile(fm).then(res=>{
              if(res.data.code == 1){
                this.form.practice[index].url = res.data.data;
              }
            })
          })
        }
      },
      checkSize(file,fn){
        if(file.file.size/1024/1024 <= 3){
          fn.apply(this,arguments)
        }else{
          Toast('请上传小于3MB的图片')
        }
      },
      //图片删除
      del(name,index){
        this.form[name].splice(index,1)
      },
      delUrl(name,index){
        this.form[name][index].url = '';
      },
      //添加项
      addItem(name){
        if(this.form[name].length < 3){
          this.form[name].push({content:'',url:''})
        }
      },
      //删除项
      delItem(name,index){
        this.form[name].splice(index,1)
      },
      //提交
      submit(){
        if(!this.form.studentIntroduce){
          Toast('请填写我的至美成长')
          return
        }
        if(!this.form.teacherMessage){
          Toast('请填写家长至美成长寄语')
          return
        }
        if(!this.form.homepage){
          Toast('请填写少先队文字')
          return
        }
        if(this.form.homepageUrl.length == 0){
          Toast('请上传少先队图片')
          return
        }
        if(!this.form.artLevel){
          Toast('请填写期末闯关')
          return
        }
        if(this.form.artLevelUrl.length == 0){
          Toast('请上传期末闯关图片')
          return
        }
        for(let i = 0; i<this.form.strive.length;i++){
          let item = this.form.strive[i];
          if(!item.content || !item.url){
            Toast('请完善努力成长的我图文')
            return
          }
        }
        for(let i = 0; i<this.form.practice.length;i++){
          let item = this.form.practice[i];
          if(!item.content || !item.url){
            Toast('请完善勇于实践的我图文')
            return
          }
        }
        let data = cloneDeep(this.form);
        data.year=this.year;
        data.homepageUrl = data.homepageUrl.join(',');
        data.artLevelUrl = data.artLevelUrl.join(',');
        data.studentId = String(this.user.achievementLianhua.studentUserId);
        data.lianhuaStudentBadges = [...this.list1,...this.list2,...this.list3,...this.list4];
        this.submitData(data).then(res=>{
          if(res.code == 1){
            Toast(res.msg)
            setTimeout(()=>{this.$router.go(-1)},2000)
          }
        })
      },
      getListData(){
        if(this.user){
          this.userInfo = this.user;
          this.getPXM({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
            if(res.code == 1){
              this.list1 = res.data.home;
              this.list2 = res.data.school;
            }
          })
          this.getZSM({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
            if(res.code == 1){
              this.list3 = res.data.lianhuaStudentBadges;
            }
          })
          this.getSXM({studentId:this.user.achievementLianhua.studentUserId,year:this.year}).then(res => {
            if(res.code == 1){
              this.list4 = res.data.lianhuaStudentBadges;
            }
          })
        }
      },
    },

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
    padding-bottom: 150px;
    .title{
      font-size: 32px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #2D2929;
      line-height: 1;
      margin: 30px 0 24px;
    }
    .content{
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    textarea{
      width: 100%;
      min-height: 224px;
      background: #FFFFFF;
      border-radius: 16px 16px 16px 16px;
      padding: 30px;
      box-sizing: border-box;
      font-size: 28px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #010101;
      line-height: 1.5;
      border: none;
      &::placeholder{
        color: #999999;
      }
    }
    .img-list{
      margin-top: 25px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .add{
        width: 220px;
        height: 220px;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 40px;
          height: 40px;
        }
      }
      .img-item{
        width: 220px;
        height: 220px;
        border-radius: 16px 16px 16px 16px;
        position: relative;
        margin-right: 20px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .del{
          width: 40px;
          height: 40px;
          background-color: red;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          position: absolute;
          right: -20px;
          top: -20px;
          color: #FFFFFF;
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .addItem{
      width: 220px;
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      color: #6C69FF;
      border: 1px solid #6C69FF;
      font-size: 30px;
      background-color: transparent;
      letter-spacing: 2px;
      margin-bottom: 24px;
    }
    .delItem{
      width: 100%;
      height: 70px;
      background-color: #e0e0e0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      img{
        width: 40px;
        height: 40px;
      }
    }
    .fixed{
      width: 100%;
      padding:10px 25px;
      box-sizing:border-box;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #FFFFFF;
      z-index: 20;
      .submit{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 24px;
        background-color: #FFC336;
        font-size: 34px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 1;
        border: none;
        //margin-top: 200px;
      }
    }
    .list{
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
      .input-cell{
        .input{
          margin-top: 20px;
          display: flex;
          align-items: center;
          span{
            width:100px;
            display: block;
            flex-shrink: 0;
            margin-right: 20px;
            font-size: 22px;
          }
          input{
            flex-grow: 1;
            background-color: #dbdbdb;
            border-color: transparent;
            height: 50px;
            border-radius: 10px;
            font-size: 22px;
            padding-left: 20px;
          }
        }

      }
    }
  }
</style>

