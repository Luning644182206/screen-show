<template lang="jade">
.photo-frame
  //- carousel(type="card")
  div
    div(style="color: #fff; font-size: .5rem; margin-bottom: 10%; padding-top: .2rem; padding-left: .2rem") Hi! It's DMS Lab.
  el-carousel(:interval="4000" type="card" height="450px")
    el-carousel-item.photo-frame-item(key="1")
      img(src="../../assets/images/pic/1.jpg")
    //- el-carousel-item.photo-frame-item(key="2")
    //-   img(src="../../assets/images/pic/2.jpg")
    el-carousel-item.photo-frame-item(key="3")
      img(src="../../assets/images/pic/3.jpg")
    el-carousel-item.photo-frame-item(key="4")
      img(src="../../assets/images/pic/4.jpg")
    el-carousel-item.photo-frame-item(key="5")
      img(src="../../assets/images/pic/5.jpg")
    el-carousel-item.photo-frame-item(key="6")
      img(src="../../assets/images/pic/6.jpg")
</template>
<script>
import {Carousel} from 'element-ui';
import $ from 'jquery';
import _ from 'lodash';
export default {
  name: 'app',
  components: {
      carousel: Carousel
  },
  props: {
      resize: {
          type: Number,
          default: 0
      }
  },
  watch: {
      resize(resize) {
          this.resizeChartsHeight();
      }
  },
  mounted () {
      this.resizeChartsHeight();
  },
  data () {
      return {
          imgs: [
              {
                  link: '../../assets/images/pic/1.png',
                  index: 0
              },
              {
                  link: '../../assets/images/2.png',
                  index: 1
              },
              {
                  link: '../../assets/images/3.png',
                  index: 2
              }
          ]
        }
  },
  methods:{
      resizeChartsHeight() {
          let $photo = $('.photo-frame');
          let height = $(window).height();
          let width = $(window).width();
          $photo.height(height);
      }
  }
}

</script>

<style lang="less">
.photo-frame {
    background: url('../../assets/images/background.png') no-repeat;
    background-size: cover;
    height: 1200px;
    img {
        width: 8rem;
        border-radius: .2rem;
    }
    .photo-frame-item {
        width: 8rem;
    }
}
</style>