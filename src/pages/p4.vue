<template>
  <div class="entry">
    <HeaderBar :back="current !== 0" :next="current !== list.length - 1" :right="rightTxt" @clickStep="click">我是至美少年
    </HeaderBar>
    <div class="swiper-container banner-swiper" id="mySwiper">
      <div class="swiper-wrapper">
        <div v-for="(listItem, listIndex) in list" :key="listItem.studentName" class="swiper-slide">
          <div class="list_box">
            <div class="content" :id="`pdf${listIndex}`">
              <div class="title">{{ listItem.studentName }}</div>
              <div class="table_box">
                <div class="head_box">
                  <div v-for="item in listItem.key" :key="item" class="item">{{ item }}</div>
                </div>
                <div v-for="it in listItem.value" :key="it" class="row">
                  <div v-for="(item) in it" :key="item" class="item">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import Swiper from 'swiper';
import { Toast } from 'vant';
import request from '@/assets/js/request';
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
      list: [],
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
    this.initSwiper();
    request.get('h5/getClassStudentGrade', {
      params: {
        schoolId: this.$route.query.schoolId,
        yearId: this.$route.query.yearId,
        classId: this.$route.query.classId
      }
    }).then(response => {
      this.list = response?.data || [];
      this.$nextTick(() => {
        setTimeout(() => {
          this.save()
        }, 2000)
      })


    }).catch(error => {
    });
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
      const toast = Toast.loading({
        message: '生成文件中...',
        forbidClick: true,
        duration: 0,
      });
      let promises = []
      this.list.forEach((item, index) => {
        promises.push(render(`pdf${index}`, index !== this.list.length - 1, index % 2 === 1))
      })
      Promise.all(promises).then(() => {
        PDF.save("test.pdf");
        toast.close()
      })
      function render(key, isLastPage, isAddImage) {
        return new Promise((resolve, reject) => {
          html2canvas(document.querySelector(`#${key}`), {
            allowTaint: true,
            proxy: true,
            useCORS: true,
            removeContainer: true,
            scrollY: 0,
            scrollX: 0,
          }).then(function (canvas) {
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            const pageWidth = PDF.internal.pageSize.getWidth();
            const pageHeight = PDF.internal.pageSize.getHeight();
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;
            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;
            const pdfWidth = canvasWidth / 2 * 1.2
            const pdfHeight = canvasHeight / 2 * 1.2
            if (isAddImage) {
              PDF.addImage(pageData, 'JPEG', 0, pdfHeight + 20, pdfWidth, pdfHeight);
            } else {
              PDF.addImage(pageData, 'JPEG', 0, 10, pdfWidth, pdfHeight);
            }
            isLastPage && isAddImage && PDF.addPage()
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

.list_box {
  display: flex;
  justify-content: center;

  .content {
    width: 650px;
    height: 480px;
    display: flex;
    flex-direction: column;
  }

}

.title {
  flex: 0 0 auto;
  padding-top: 10px;
  font-size: 24px;
  text-align: center;
}

.table_box {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 28px;

  .head_box {
    display: flex;
    flex: 1 1 auto;
    border-bottom: 1px solid #5b5b5b;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      width: 20%;
      box-sizing: border-box;
      border-right: 1px solid #5b5b5b;
      border-top: 1px solid #5b5b5b;
      background-color: rgba(orange, 0.7);
      color: #fff;
      font-weight: 600;
      font-size: 14px;

      &:first-child {
        border-left: 1px solid #5b5b5b;
      }
    }
  }


  .row {
    display: flex;
    flex: 1 1 auto;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 20%;
      box-sizing: border-box;
      border-right: 1px solid #5b5b5b;
      border-bottom: 1px solid #5b5b5b;
      font-size: 12px;

      &:first-child {
        border-left: 1px solid #5b5b5b;
      }
    }
  }
}
</style>
