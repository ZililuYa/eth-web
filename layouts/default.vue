<template>
  <div>
    <Header></Header>
    <div class="app containers default" id="default">
      <nuxt/>
    </div>
    <Footer></Footer>
    <Copyright></Copyright>
  </div>
</template>
<script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  import Copyright from '~/components/Copyright.vue'
  //  import Cookie from "js-cookie";
  //  import { mapMutations } from 'vuex';
  //  import 'bootstrap'

  export default {
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    data () {
      return {
        info: ''
      }
    },
    components: {
      Header,
      Footer,
      Copyright
    },
    methods: {
//      ...mapMutations({
//        setUser: 'user/setUser',
//        setToken: 'user/setToken'
//      }),
      faYa (path) {
//        console.log('当前：', path)
        if (path.indexOf('/user') === 0 && !this.user.email) {
          location.href = '/login'
          return false
        }
        if (path.indexOf('/panel') === 0 && !this.user.email) {
          location.href = '/login'
          return false
        }
        return true
      }
    },
    mounted () {

//      if (Cookie.get('user'))
//        this.setUser(JSON.parse(Cookie.get('user')))
//      if (Cookie.get('token'))
//        this.setToken(Cookie.get('token'))

//      console.log(JSON.parse(Cookie.get('user')))

      this.faYa(this.$route.path)
      this.$router.beforeEach((to, from, next) => {
        if (this.faYa(to.path)) {
          next()
        } else {
          // not faYa
        }
      })
    }
  }
</script>
<style lang="less">
  /*全局样式*/
  @import '../assets/css/font.css';
  @import '../assets/css/site.min.css';
  @import "../assets/css/alert.less";

  * {
    border-radius: 0 !important;
    font-family: "Monda", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  input[type='text'] {
    outline: none;
    -webkit-appearance: none;
  }

  .containers.default {
    padding-top: 56px;
    min-height: 100vh;
  }

  .containers .container:last-child {
    padding-top: 15px;
  }

  .needs-validation {
    font-size: 13px;
    padding: 5rem 0;
  }

  body {
    background-color: #fefefe;
  }

  .form-group.icon {
    position: relative;
    &.icon .fa {
      position: absolute;
      line-height: 48px;
      right: 15px;
      top: 0;
      font-size: 20px;
      cursor: pointer;
      width: 25px;
      text-align: center;
    }
  }

  li {
    list-style: none;
  }

  .UserHeader, .PanelHeader {
    width: 100%;
    .navbar {
      background-color: #fff;
      min-height: 40px;
      width: 100%;
      padding: 0 50px;
    }
    #menu-classic {
      width: 100%;
    }
    .menu-holder {
      float: left;
      ul {
        overflow: hidden;
        margin-bottom: 0;
      }
      li.submenu {
        float: left;
        line-height: 40px;
        font-size: 14px;
        margin-right: 30px;
        &.active a {
          line-height: 34px;
          border-bottom: 3px solid #007bff;
        }
        a {
          color: #757575;
          transition-duration: .2s;
          text-decoration: none;
          line-height: 40px;
          display: inline-block;
          cursor: pointer;
          &:hover {
            color: #007bff;
          }
        }
      }
    }
    .secondary-background {
      width: 100%;
      /*background-color: rgba(20,115,251,0.5);*/
      background-color: #007bff;
      min-height: 264px;
      background-image: url("/images/page-header.png");
    }
    .white {
      color: #fff;
    }
    .white.ul {
      float: left;
      overflow: hidden;
      padding-left: 0;
      li {
        float: left;
        margin-right: 30px;
        text-transform: uppercase;
      }
    }
  }

  a.more {
    height: 40px;
    line-height: 36px;
    padding-left: 25px;
    padding-right: 25px;
    border: 2px solid #255FF7;
    border-radius: 50px !important;
    color: #676e80;
    background-color: transparent;
    font-size: 15px;
    transition-duration: 0.4s;
    text-decoration: none;
    &:hover {
      background-color: #255FF7;
      color: #fff;
    }
  }

  .va-top {
    vertical-align: top;
    font-size: 25px;
  }

  .qr-code {
    .code {
      width: 100%;
      height: 140px;
      margin: 0 auto;
      padding: 5px 0;
      display: table;
      .text {
        display: table-cell;
        padding-right: 30px;
        vertical-align: top;
      }
      img {
        /*float: right;*/
        display: table-cell;
      }
    }
  }

  .flatpickr-months .flatpickr-month {
    height: 45px !important;
  }

  .uppercase .nav-link {
    text-transform: uppercase;
  }

  .ellipsis {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a.project-item {
    display: inline-block;
    margin-bottom: 15px;
    color: #555;
    text-decoration: none;
    .progress-sm {
      height: 3px;
    }
    .card {
      transition-duration: 0.3s;
    }
    .card:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .card-body {
      font-size: 13px;
    }

    .card-text {
      height: 38px;
      line-height: 19px;
      overflow: hidden;
    }
  }

  .Announcements {
    padding-bottom: 80px;
    .h3 {
      margin-bottom: 30px;
    }
    .bd {
      overflow: hidden;
      /*background: -webkit-linear-gradient(-128deg, #43acd7, #255ff7);*/
      /*background: -moz-linear-gradient(-128deg, #43acd7, #255ff7);*/
      /*background: -ms-linear-gradient(-128deg, #43acd7, #255ff7);*/
      /*background: -o-linear-gradient(-128deg, #43acd7, #255ff7);*/
      /*background: linear-gradient(-128deg, #43acd7, #255ff7);*/
      /*border-bottom-left-radius: 20px !important;*/
      /*border-bottom-right-radius: 20px !important;*/
      padding: 7px 14px;
      color: #192031;
      background-color: #fff;
      * {
        color: #192031;
        font-size: 13px;
      }
      .l1-item {
        overflow: hidden;
        padding: 7px 0;
        .l1-date {
          height: 30px;
          line-height: 30px;
          padding-left: 28px;
          padding-right: 30px;
          border: 1px solid #192031;
          border-radius: 30px !important;
        }
        .l1-title {
          line-height: 30px;
          margin-left: 14px;
        }
        .l1-go {
          margin-top: 4px;
        }
      }
    }
  }
</style>
