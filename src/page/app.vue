<template lang="jade">
.show-app
  .menu
    .photo(@click="isHome = true")
      img(src="/src/assets/images/favicon.png")
    .name(@click="clickAddress()")
      ul
        li.one(v-for="item in webAddress")
          a(:href="item.link" target="showHere" @click="showIframe") {{item.name}}
    .footer
      .pic
        a.github(href="https://github.com/fromskyblue/" target="_blank")
          img(src="/src/assets/images/github.png")
        a.home(href="http://yzlab.net/" target="_blank")
          img(src="/src/assets/images/home.png")
      .copyright Copyright © 2005-2018 DMS Lab
  iframe.iframe(v-show="iframeState && (!isHome)", id="show-iframe", frameBorder=0, name="showHere", scrolling=auto, src="")
  photo(v-show="isHome")
</template>

<style lang="less">
.show-app {
    height: 100%;
    width: 100%;
    font-size: 0.16rem;
    a {
        color: #fff;
    }
    .menu {
        color: #fff;
        background: url('../assets/images/menu-background.png') no-repeat;
        position: fixed;
        height: 100%;
        width: 3rem;
        z-index: 1000;
        // box-shadow: 0 0 16px 11px #888;
        .photo {
            cursor: pointer;
            padding-top: 20%;
            text-align: center;
            // margin: 20% 30%;
            img {
                height: 1rem;
                width: 1rem;
                border-radius: .5rem;
            }
        }
        transition: transform 250ms ease;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transform: translate(-2.99rem);
        &:hover {
          transform: translate(0px);
          /*box-shadow: 0 0 16px 11px #888;*/
        }
    }
    .iframe {
        height: 100%;
        width: 100%;
    }
    .footer {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0.1rem;
        font-size: 0.14rem;
        .pic {
            width: 100%;
            .github, .home {
                img {
                    width: .24rem;
                    height: .24rem;
                }
            }
        }
    }
    .name {
        padding-top: 30%;
        .one {
            text-align: center;
        }
    }
}
</style>

<script>
import photo from './components/photo';
import _ from 'lodash';
let currentComponent;
window.onresize = _.throttle(function () {
    // currentComponent.init();
    currentComponent.iframeHeightResize();
}, 500);
export default {
  name: 'app',
  components: {
    photo
  },
  data () {
    return {
      iframeState:false,
      goBackState:false,
      webAddress: [
        {
            name:'Keywords Extraction',
            link:'http://demo.yzlab.net:8090'
        }
      ],
      isHome: true
    }
  },
  mounted(){
      currentComponent = this;
      this.iframeHeightResize();
  },
  methods:{
    iframeHeightResize() {
        const oIframe = document.getElementById('show-iframe');
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        oIframe.style.width = deviceWidth + 'px';
        oIframe.style.height = deviceHeight + 'px';
    },
    goBack(){
      this.goBackState = false;
      this.iframeState = false;
    },
    showIframe(){
      this.goBackState = true;
      this.iframeState = true;
    },
    clickAddress() {
      this.isHome = false;
      this.iframeHeightResize()
    }
  }
}

</script>