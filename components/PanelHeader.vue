<template>
  <!--<div class="UserHeader">-->
  <!--<b-nav justified tabs>-->
  <!--<b-nav-item @click="href(i.url)" v-for="(i, k) in data" :key="k" :active="i.url === path">{{i.name}}</b-nav-item>-->
  <!--</b-nav>-->
  <!--</div>-->
  <div class="PanelHeader">
    <div class="row">
      <nav class="navbar navbar-default ">
        <!--  Classic menu, responsive menu classic  -->
        <div id="menu-classic">
          <div class="menu-holder">
            <ul>
              <li class="submenu" :class="path === i.url ? 'active':''" v-for="(i, k) in data" :key="k">
                <a class="active-item" @click="href(i.url)">{{i.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="page-header" class="secondary-background" ref="page">
        <div class="container">
          <div class="row no-margin">
            <div class="text col-lg-12">
              <p><br><br></p>
              <h1 class="white" :key="i.url" v-for="i in data" v-if="i.url === path">{{i.name}}</h1>
              <ul class="white ul">
                <li v-for="i in path.split('/')" :key="i" v-if="i"><h2>{{i}}</h2></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NuxtLink from "../.nuxt/components/nuxt-link";

  export default {
    components: {NuxtLink},
    data () {
      return {
        path: '',
        data: [{
          url: '/panel',
          name: '控制面板'
        }, {
          url: '/panel/project',
          name: '项目管理'
        }, {
          url: '/panel/user',
          name: '用户列表'
        }, {
          url: '/panel/income',
          name: '平台收入'
        }, {
          url: '/panel/sync',
          name: '区块同步'
        }]
      }
    },
    methods: {
      href (url) {
//        location.href = url
        this.$router.push(url)
        this.path = url
      }
    },
    mounted () {
      this.path = this.$route.path
//      console.log(this.path)
      let page = this.$refs.page
      let i = 0
//      console.log(page.style)
      setInterval(() => {
        i++
        page.style.backgroundPositionY = i + 'px'
      }, 50)
    }
  }
</script>
<style lang="less">
</style>
