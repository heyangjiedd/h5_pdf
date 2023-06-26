<template>
  <div class="headerBar">
    <div class="inside" :style="{ position: 'fixed' }">
      <div class="left" v-if="back" @click="handleClick(-1)">
        <i class="iconfont icon-keyboardarrowleft"></i>
        <span>上一个</span>
      </div>
      <p class="title">
        <slot></slot>
        <span class="sort_num">
          ({{ right }})
        </span>
      </p>
      <div class="right" v-if="next" @click="handleClick(1)">
        <span>下一个</span>
        <i class="iconfont icon-keyboardarrowleft icon_next"></i>
      </div>
    </div>
    <div class="fill" v-if="isFixed"></div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  props: {
    back: {
      type: Boolean,
      default: true
    },
    next: {
      type: Boolean,
      default: true
    },
    right: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick(data) {
      this.$emit('clickStep', data)
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 88px;

.headerBar {
  width: 100%;
  height: $height;

  //display: flex;
  //justify-content: center;
  //align-items: center;
  .inside {
    width: 100%;
    height: $height;
    background: #FFFFFF;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .left {
      position: absolute;
      left: 10px;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 60px;
      }

      span {
        display: inline-block;
        //margin-left: 10px;
        font-size: 26px;
      }
    }

    .title {
      font-size: 36px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #2D2929;
      line-height: 1;
    }

    .right {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 60px;
      }

      .icon_next {
        transform: rotate(180deg);
      }

      span {
        font-size: 26px;
      }
    }

    .sort_num {
      color: #5b5b5b;
      font-size: 26px;
    }
  }

  .fill {
    width: 100%;
    height: $height;
  }
}
</style>
