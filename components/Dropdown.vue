<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" ref="dropdown" @click="showDiv">
      {{title}}
    </a>
    <div :class="`dropdown-menu ${show}`" aria-labelledby="navbarDropdown" v-if="!dropClick">
      <nuxt-link :class="i.value==='divider'?'dropdown-divider':'dropdown-item'" :tag="i.value==='divider'?'div':'a'" v-for="(i, k) in data" v-bind:key="k" :to="i.value">{{i.title}}</nuxt-link>
      <!--<div class="dropdown-divider"></div>-->
    </div>
    <div :class="`dropdown-menu ${show}`" aria-labelledby="navbarDropdown" v-if="dropClick">
      <a :class="i.value==='divider'?'dropdown-divider':'dropdown-item'" @click="dropClick(i.value)" v-for="(i, k) in data" v-bind:key="k">{{i.title}}</a>
      <!--<div class="dropdown-divider"></div>-->
    </div>
    <!--<div :class="`dropdown-back ${show}`"></div>-->
  </li>
</template>
<script>

  import NuxtLink from "../.nuxt/components/nuxt-link";

  export default {
    components: {NuxtLink},
    data () {
      return {
        show: '',
        now: false
      }
    },
    props: {
      title: String,
      data: Array,
      dropClick: Function
    },
    mounted () {
      this.path = this.$route.path
    },
    methods: {
      showDiv () {
        if (!this.show) {
          this.show = 'show'
          let vm = this
          this.now = true
          if (this.show === 'show') {
            let handle = function (ev) {
              let target = ev.target || ev.srcElement
              console.log(vm.title, vm.$refs.dropdown, vm.now)
              // if (target === vm.$refs.dropdown && vm.now) {
              //   return false;
              // }
              if (vm.now) {
                vm.now = false
                return
              }
              vm.show = ''
              window.document.body.removeEventListener("click", handle, false);
            }
            window.document.body.addEventListener('click', handle, false);
          }
        }
        // this.show === '' ? this.show = 'show' : this.show = ''

      }
    }
  }
</script>
<style>
  .nav-link {
    cursor: pointer;
  }

  .dropdown-back {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: none;
  }

  .dropdown-back.show {
    display: inline-block;
  }
  .dropdown-item {
    cursor: pointer;
  }
</style>
