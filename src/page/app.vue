<template lang="jade">
.show-app
  .menu
    .photo
      img(src="/src/assets/images/favicon.png")
    .name
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
  iframe.iframe(v-show="iframeState", id="show-iframe", frameBorder=0, name="showHere", scrolling=auto, src="")
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
        background-color: #394e66;
        position: fixed;
        height: 100%;
        width: 3rem;
        box-shadow: 0 0 16px 11px #888;
        .photo {
            padding-top: 20%;
            text-align: center;
            // margin: 20% 30%;
            img {
                height: 1rem;
                width: 1rem;
                border-radius: .5rem;
            }
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
export default {
  name: 'hello',
  data () {
    return {
      iframeState:false,
      goBackState:false,
      webAddress: [
        {
            name:'Keywords Extraction',
            link:'http://67.209.177.93/'
        }
      ]
    }
  },
  mounted(){
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
  },
  methods:{
    goBack(){
      this.goBackState = false;
      this.iframeState = false;
    },
    showIframe(){
      this.goBackState = true;
      this.iframeState = true;
    }
  }
}

</script>