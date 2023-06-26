<template>
  <div class="entry">
    <HeaderBar :back="current !== 0" :next="current !== list.length - 1" :right="rightTxt" @clickStep="click">我是至美少年
    </HeaderBar>
    <div class="swiper-container banner-swiper" id="mySwiper">
      <div class="swiper-wrapper">
        <div v-for="(listItem, listIndex) in list" :key="listItem" class="swiper-slide" :id="`pdf${listIndex}`">
          <div class="title">张三</div>
          <div class="table_box">
            <div class="head_box">
              <div v-for="item in headerList" :key="item" class="item">{{ item }}</div>
            </div>
            <div class="body_box">
              <div v-for="it in bodyList" :key="it" class="row">
                <div v-for="(item, index) in headerList" :key="item" class="item">
                  <span v-if="index === 0">{{ it }} </span>
                  <span v-else>{{ listItem }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fix_btn_box">
      <div class="download_btn" @click="save">批量下载</div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  name: "page4",
  props: {
    swiperC: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headerList: ['科目', '平时', '期末', '总评'],
      bodyList: ['道德与法治', '语文', '数学', '体育与健康', '美术', '外语'],
      list: [1, 2, 3, 4, 5, 6],
      current: 0,
      swiper: null
    }
  },
  computed: {
    rightTxt() {
      return `${this.current + 1}/${this.list.length}`
    }
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    click(data) {
      this.current += data;
      this.swiper.slideTo(this.current, 0, false)
    },
    initSwiper() {
      const swiper = new Swiper('.banner-swiper', { observeParents: true, observer: true, })
      swiper.slideTo(0, 0, false)
      const _this = this
      swiper.on("slideChange", function () {
        _this.current = this.activeIndex;
      });
      this.swiper = swiper;
    },
    save() {
      let maxWidth = 0;
      let maxHeight = 0;
      this.list.map((value, index) => {
        let w = $(`#pdf${index}`).width();
        let h = $(`#pdf${index}`).height();
        if (w > maxWidth) {
          maxWidth = w
        }
        if (h > maxHeight) {
          maxHeight = h
        }
      })
      let PDF = new jsPDF('', 'pt', 'a4')
      let promises = []
      this.list.forEach((item, index) => {
        promises.push(render(`pdf${index}`, index !== this.list.length - 1))
      })
      Promise.all(promises).then(() => {
        PDF.save("test.pdf");
      })
      function render(key, isLastPage) {
        return new Promise((resolve, reject) => {
          html2canvas(document.querySelector(`#${key}`), {
            allowTaint: true,
            proxy: true,
            useCORS: true,
            removeContainer: true,
            scrollY: 0,
            scrollX: 0,
          }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let imgWidth = 595.28
            let imgHeight = 595.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            PDF.addImage(pageData, 'JPEG', 0, 40, imgWidth, imgHeight)
            isLastPage && PDF.addPage()
            resolve()
          }, reject)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/common";

.fix_btn_box {
  position: fixed;
  left: 30px;
  right: 30px;
  bottom: 20px;

  .download_btn {
    padding: 20px 30px;
    border-radius: 10px;
    font-size: 32px;
    background-color: rgba(orange, 0.7);
    color: #fff;
    text-align: center;
  }
}

.title {
  font-size: 36px;
  text-align: center;
  margin: 20px 0;
}

.table_box {
  margin-top: 20px;
  padding: 20px;
  font-size: 28px;

  .head_box {
    display: flex;

    .item {
      flex: 0 0 auto;
      width: 25%;
      text-align: center;
      padding: 30px 0;
      box-sizing: border-box;
      border-right: 1px solid #5b5b5b;
      border-top: 1px solid #5b5b5b;
      background-color: rgba(orange, 0.7);
      color: #fff;
      font-weight: 600;

      &:first-child {
        border-left: 1px solid #5b5b5b;
      }
    }
  }

  .body_box {
    .row {
      display: flex;

      .item {
        flex: 0 0 auto;
        width: 25%;
        text-align: center;
        padding: 30px 0;
        box-sizing: border-box;
        border-right: 1px solid #5b5b5b;
        border-bottom: 1px solid #5b5b5b;

        &:first-child {
          border-left: 1px solid #5b5b5b;
        }
      }

      &:first-child {
        .item {
          border-top: 1px solid #5b5b5b;
        }
      }
    }
  }
}
</style>
