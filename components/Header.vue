<template>
  <nav class="navbar fixed-top box-shadow navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <!--<img src="/images/logo.png" class="float-left" height="30" alt="">-->
      <a class="navbar-brand" href="/"><img src="/logo.png" height="20" class="float-left logo" alt="">&nbsp;&nbsp;ETHICO</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" @click="show" data-target="#SupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div :class="`collapse navbar-collapse ${showDiv}`" id="SupportedContent">
        <ul class="navbar-nav mr-auto">
          <nuxt-link tag="li" :to="i.url" class="nav-item" v-for="(i, k) in data" :key="k">
            <a class="nav-link fs13">{{i.name}}</a>
          </nuxt-link>
          <!--<li class="nav-item">-->
            <!--<a class="nav-link fs13" href="https://github.com/haedrig/ethico.pro/issues" target="_blank">BUG反馈</a>-->
          <!--</li>-->
        </ul>
        <div class="form-inline my-2 my-lg-0 float-right" v-if="!user.username">
          <button @click="$router.push('/login')" class="btn btn-primary my-2 my-sm-0 btn-sm" type="submit">{{$t('index.login')}}</button>
          <button @click="$router.push('/reg')" class="btn btn-light my-2 my-sm-0 btn-sm" type="submit">{{$t('index.register')}}</button>
        </div>
        <div class="form-inline my-2 my-lg-0 float-right" v-if="user.username">
          <ul class="navbar-nav mr-auto">
            <Dropdown :title="username" :data="menu">
            </Dropdown>
          </ul>
        </div>
        <div class="form-inline my-2 my-lg-0 float-right">
          <ul class="navbar-nav mr-auto">
            <Dropdown :title="lang" class="uppercase" :data="menuLang" :dropClick="clickLang">
            </Dropdown>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import Dropdown from '~/components/Dropdown.vue'
  import NuxtLink from "../.nuxt/components/nuxt-link";
  import Cookie from "js-cookie";

  export default {
    components: {
      NuxtLink,
      Dropdown,
    },
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    data () {
      return {
        username: '',
        lang: Cookie.get('lang') ? Cookie.get('lang') : 'cn',
        path: '',
        showDiv: '',
        menuLang: [
          {title: 'CN', value: 'cn'},
          {title: 'EN', value: 'en'}
        ],
        menu: [
          {title: '个人中心', value: '/user'},
//          {title: '创建项目', value: '/user/charge'},
          {value: 'divider'},
          {title: '注销', value: '/quit'}
        ],
        data: [{
          url: '/',
          name: this.$t('index.home')
        }, {
          url: '/create',
          name: '发布项目'
        }, {
          url: '/list',
          name: '浏览项目'
        }
//        , {
//          url: '/quota',
//          name: '额度交易'
//        }
        ]
      }
    },
    mounted () {
//      this.now = this.$router
      this.path = this.$route.path
      if (this.user.role === 1) {
        this.username = '管理员 ' + this.user.username
        this.menu = [
          {title: '个人中心', value: '/user'},
//          {title: '创建项目', value: '/createProject'},
          {title: '控制面板', value: '/panel'},
          {value: 'divider'},
          {title: '注销', value: '/quit'}
        ]
      } else {
        this.username = this.user.username
      }
    },
    methods: {
      clickLang (data) {
//        console.log(data)
        Cookie.set('lang', data)
        location.reload()
      },
      show () {
        this.showDiv === '' ? this.showDiv = 'showDiv' : this.showDiv = ''
      }
    }
  }
</script>

<style>
  .navbar-brand {
    font-weight: bold;
  }

  .showDiv {
    display: inline !important;
  }

  button.my-sm-0 {
    margin: 0 5px;
  }

  .fs13 {
    font-size: 18px;
  }

  /*.navbar.box-shadow {*/
  /*box-shadow: 0 0 10px #555*/
  /*}*/
  .nav-link.fs13:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    transition-duration: 0.3s;
    margin-left: 20px;
  }

  img.logo {
    margin-top: 4px;
  }
</style>
