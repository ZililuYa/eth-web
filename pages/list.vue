<template>
  <div class="list-main">
    <!--<div class="" style="width: 100%" >-->
    <!--<iframe class="iframe" style="width: 100%" src="/html/s6.html"></iframe>-->
    <!--</div>-->
    <div class="container">
      <div class="row page-ib">
        <div class="input-group input-group-sm col-lg-3">
          <!--<select class="form-control" v-model="status" @change="getData">-->
          <!--<option value="1">已创建</option>-->
          <!--<option value="2">已审核</option>-->
          <!--<option value="3">已开始</option>-->
          <!--<option value="4">已完成</option>-->
          <!--<option value="5">已结束</option>-->
          <!--</select>-->
          <b-form-group>
            <b-form-radio-group @change="getData" buttons button-variant="outline-primary" v-model="status" :options="options"></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="col-lg-6">
          <div class="input-group">
            <input type="text" class="form-control" v-model="name" placeholder="请输入项目关键字" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="getData()">搜索</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="float-right">
            <nuxt-link to="/create">
              <button class="btn btn-primary"><i class="fa fa-cube"></i> 发布项目</button>
            </nuxt-link>
          </div>
        </div>
        <p></p>
        <div v-show="!loading" class="container-fluid">
          <div class="row">
            <nuxt-link v-for="(i, k) in list" :key="k" class="col-lg-4 col-md-6 project-item" :to="'/detail/'+i.id">
              <div class="card" style="width: 100%">
                <img class="card-img-top" v-lazy="i.imageurlBig">
                <div class="card-body">
                  <h5 class="card-title">{{i.name}}</h5>
                  <p class="card-text">{{i.summary}}</p>
                  <p class="row">
                    <span class="col-lg-12">已经募集：{{i.allocation}} ETH</span>
                    <span class="col-lg-12">开始时间：{{new Date(i.startTime * 1000).format('yyyy-MM-dd hh:mm')}}</span>
                    <span class="col-lg-12">结束时间：{{new Date(i.endTime * 1000).format('yyyy-MM-dd hh:mm')}}</span>
                  </p>
                </div>
                <div class="progress progress-sm">
                  <div class="progress-bar" role="progressbar" :style="`width: ${i.allocation/i.quota*100}%`" :aria-valuenow="i.allocation/i.quota*100" aria-valuemin="0" aria-valuemax="100"></div>
                  <!--<div class="progress-bar" role="progressbar" :style="`width: 50%`" :aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>-->
                  <!--<div class="progress-main" style="width: 50%"></div>-->
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="container-fluid m-5" v-show="loading">
          <h3 class="text-center"><i class="fa fa-spinner fa-spin"></i> 加载项目中</h3>
        </div>
        <div class="container-fluid m-5" v-if="!list.length" v-show="!loading">
          <h3 class="text-center"><i class="fa fa-coffee"></i> 暂无项目</h3>
        </div>
        <!--<div class="col-lg-12 text-center page-ib">-->
        <!--<a class="btn btn-primary btn-sm float-left" href="">← 上一页</a>-->
        <!--第 1 页/共 89 页-->
        <!--<a class="btn btn-primary btn-sm float-right" href="">下一页 →</a>-->
        <!--</div>-->
      </div>

      <!--<b-modal ref="myModal" title="系统提示">-->
      <!--<div class="d-block">{{info_text}}</div>-->
      <!--</b-modal>-->
    </div>
  </div>
</template>

<script>
  import NuxtLink from "../.nuxt/components/nuxt-link";
  import axios from 'axios'

  export default {
    components: {NuxtLink},
    data () {
      return {
        status: 1,
        name: '',
        list: [],
        options: [
          {text: '正在进行中', value: 1},
//          {text: '已经完成 (4)', value: 4},
          {text: '已经结束', value: 2}
        ],
        loading: false
      }
    },
    methods: {
      getDate (num) {
        let date = new Date(num)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      },
      init () {
        this.getData()
      },
      getData (num) {
        if (num) this.status = num
        this.loading = true
        let params = {
          url: '/project/list',
          method: 'POST',
          data: {active: this.status, name: this.name}
        }
        let callback = (data) => {
          this.list = data.data_set
          if (this.status === 1)
            this.options[this.status - 1].text = `正在进行中 (${this.list.length})`
          if (this.status === 2)
            this.options[this.status - 1].text = `已经结束 (${this.list.length})`
          this.loading = false
        }
        let error = (data) => {
          this.$Alert.modal({
            prompt: data.msg
          });
        }
//        let callback = (data) => {
//          console.log(data)
//        }
        this.$axios.ajax(params, callback, error)
      },
    },
    mounted () {
      this.init()
//      $('.carouselExampleControls').carousel()
    }
  }
</script>

<style lang="less">
  .list-main {
    padding-bottom: 50px;
    .iframe {
      border-width: 0 !important;
      width: 100%;
      height: 400px;
    }
    .card-img-top[lazy="loading"] {
      width: auto !important;
    }
    .img .thumbnail {
      width: 100%;
    }


    .page-ib {
      margin-bottom: 15px;
      font-size: 13px;
    }

    .page-ib .btn-light {
      margin-left: 15px;
    }

  }
</style>
