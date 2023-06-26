<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState,mapMutations,mapActions } from 'vuex';
export default {
  components:{

  },
  name: "entry",
  data(){
    return{
      list:[
        {title:'我是至美少年',isShowHeaderBar:true,name:'p2'},
        {title:'至美成长轨迹',isShowHeaderBar:true,name:'nav'},
        {title:'我的至美成长',isShowHeaderBar:true,name:'p8'},
        {title:'',isShowHeaderBar:false,name:'p1'},
      ],
    }
  },
  mounted() {

  },
  methods:{

  },

}
</script>

<style lang="scss">

</style>
