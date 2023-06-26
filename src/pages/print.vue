<template>
  <div>
    <div id="capture">
      <P1 id="P1s" :swiperC="false"></P1>
      <Nav id="Nav" :swiperC="false"></Nav>
      <N1_1 id="N1_1" :swiperC="false"></N1_1>
      <N1_2 id="N1_2" :swiperC="false"></N1_2>
      <N1_3 id="N1_3" :swiperC="false"></N1_3>
      <N2_1 id="N2_1" :swiperC="false"></N2_1>
      <N2_2 id="N2_2" :swiperC="false"></N2_2>
      <N2_3 id="N2_3" :swiperC="false"></N2_3>
      <N2_4 id="N2_4" :swiperC="false"></N2_4>
      <N3_1 id="N3_1" :swiperC="false"></N3_1>
      <N3_2 id="N3_2" :swiperC="false"></N3_2>
      <N3_3 id="N3_3" :swiperC="false"></N3_3>
      <N4_1 id="N4_1" :swiperC="false"></N4_1>
      <N4_2 id="N4_2" :swiperC="false"></N4_2>
      <N5_1 id="N5_1" :swiperC="false"></N5_1>
      <N5_2 id="N5_2" :swiperC="false"></N5_2>
      <P2 id="P2" :swiperC="false"></P2>
      <P3 id="P3" :swiperC="false"></P3>
    </div>

    <div class="hidden-mask">
      <div class="didi" v-if="hidden">
        <img class="right-top" src="@assets/img/right-top.png" alt="">
        <p>请点击右上角使用浏览器打开</p>
      </div>
      <div class="isRender" v-else>
        <van-loading size="30px" />
        <p class="el">正在生成文件中,请稍后...</p>
      </div>
    </div>

  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { Toast } from 'vant';
import p1 from './p1'
import p2 from './p2'
import p3 from './p3'
import nav from './nav/nav'
import n1_1 from './nav/n1/n1_1'
import n1_2 from './nav/n1/n1_2'
import n1_3 from './nav/n1/n1_3'
import n2_1 from './nav/n2/n2_1'
import n2_2 from './nav/n2/n2_2'
import n2_3 from './nav/n2/n2_3'
import n2_4 from './nav/n2/n2_4'
import n3_1 from './nav/n3/n3_1'
import n3_2 from './nav/n3/n3_2'
import n3_3 from './nav/n3/n3_3'
import n4_1 from './nav/n4/n4_1'
import n4_2 from './nav/n4/n4_2'
import n5_1 from './nav/n5/n5_1'
import n5_2 from './nav/n5/n5_2'

export default {
  name: "print",
  components: {
    P1: p1,
    P2: p2,
    P3: p3,
    Nav: nav,
    N1_1: n1_1,
    N1_2: n1_2,
    N1_3: n1_3,
    N2_1: n2_1,
    N2_2: n2_2,
    N2_3: n2_3,
    N2_4: n2_4,
    N3_1: n3_1,
    N3_2: n3_2,
    N3_3: n3_3,
    N4_1: n4_1,
    N4_2: n4_2,
    N5_1: n5_1,
    N5_2: n5_2,
  },
  data() {
    return {
      hidden: false,
      pdf: '',
      Interval: null,
    }
  },
  mounted() {
    if (window.dd) {
      this.hidden = true;
    }
    else {
      // Toast.loading({
      //   message: '生成文件中...',
      //   forbidClick: true,
      //   duration:0,
      //   position: 'bottom',
      // });
      this.Interval = setInterval(this.scroll, 1000)
      setTimeout(() => {
        this.save()
      }, 5000)
    }




  },
  beforeUnmount() {
    Toast.clear();
    clearInterval(this.Interval, 1000)
    this.Interval == null;
    console.log('Unmount')
  },
  methods: {
    scroll() {
      window.scroll({ top: $('#capture').height(), left: 0, behavior: 'smooth' });
    },
    save() {
      let maxWidth = 0;
      let maxHeight = 0;
      // let comList = ['P1s', 'N1_1', 'N1_2','N1_3', 'N2_1', 'N2_2', 'N2_3', 'N2_4'];
      let comList = ['P1s', 'Nav', 'N1_1', 'N1_2', 'N1_3', 'N2_1', 'N2_2', 'N2_3', 'N2_4', 'N3_1', 'N3_2', 'N3_3', 'N4_1', 'N4_2', 'N5_1', 'N5_2', 'P2', 'P3'];
      comList.map((value, index) => {
        let w = $(`#${value}`).width();
        let h = $(`#${value}`).height();
        if (w > maxWidth) {
          maxWidth = w
        }
        if (h > maxHeight) {
          maxHeight = h
        }
      })
      let PDF = new jsPDF('', 'pt', [maxWidth, maxHeight])
      let position = 0;
      let _this = this;
      function render(key) {
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
          let imgWidth = maxWidth
          let imgHeight = maxWidth / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          position -= maxHeight;
          let nextIndex = comList.findIndex(value => value == key) + 1;
          let nextKey = comList[nextIndex];
          if (nextKey) {
            PDF.addPage()
            render(nextKey)
          }
          else {
            Toast.clear();
            PDF.save("test.pdf");
            _this.$router.go(-1)
          }
        })
      }
      render("P1s")
      // comList.map((value, index) => {
      //   html2canvas(document.querySelector(`#${value}`), {
      //     allowTaint: true,
      //     proxy: false,
      //     useCORS: true,
      //     removeContainer: true,
      //     scrollY: 0,
      //     scrollX: 0,
      //   }).then(function (canvas) {
      //     let contentWidth = canvas.width
      //     let contentHeight = canvas.height
      //     let imgWidth = 375.28
      //     let imgHeight = 375.28 / contentWidth * contentHeight
      //     let pageData = canvas.toDataURL('image/jpeg', 1.0)
      //     PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      //     position -= maxHeight;
      //     PDF.addPage()
      //     endList.push('');
      //     console.log(index)
      //     if(endList.length == comList.length){
      //       console.log('E',position)
      //       PDF.save("test.pdf")
      //
      //     }
      //   })
      // })



    }
    //   html2canvas(document.querySelector('#capture'), {
    //     allowTaint:true,
    //     proxy:true,
    //     useCORS:true,
    //     removeContainer:true,
    //     scrollY: 0,
    //     scrollX: 0,
    //   }).then(function (canvas) {
    //         let a4Height = 841.89;
    //         let contentWidth = canvas.width
    //         let contentHeight = canvas.height
    //         let position = 0
    //         let imgWidth = contentWidth
    //         let imgHeight = contentHeight
    //         let pageData = canvas.toDataURL('image/jpeg', 1.0)
    //         let PDF = new jsPDF('', 'pt', [imgWidth, imgHeight])
    //         PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    //         PDF.save("test.pdf")
    //   })
    // },
    // let a4Height = 841.89;
    // let contentWidth = canvas.width
    // let contentHeight = canvas.height
    // let pageHeight = contentWidth / 592.28 * a4Height;
    // let leftHeight = contentHeight
    // let position = 0
    // let imgWidth = 595.28
    // let imgHeight = 592.28 / contentWidth * contentHeight
    // let pageData = canvas.toDataURL('image/jpeg', 1.0)
    // let PDF = new jsPDF('', 'pt', 'a4')
    // if (leftHeight < pageHeight) {
    //   PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    // } else {
    //   while (leftHeight > 0) {
    //     PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    //     leftHeight -= pageHeight
    //     position -= a4Height
    //     if (leftHeight > 0) {
    //       PDF.addPage()
    //     }
    //   }
    // }
    // PDF.save("test.pdf")
  }
}
</script>

<style lang="scss" scoped>
.hidden-mask {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;

  .el {
    font-size: 30px;
    margin-top: 20px;
    color: #5b5b5b;
  }

  .isRender {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .didi {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    //align-items: center;
    justify-content: center;

    p {
      font-size: 40px;
      color: #FFFFFF;
      margin-top: 200px;
    }

    .right-top {
      width: 50px;
      position: absolute;
      top: 50px;
      right: 50px;
    }
  }
}
</style>
