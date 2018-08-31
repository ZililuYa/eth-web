<template>
  <div class="container detail-main">
    <div class="" v-show="!data.name">
      <h3 class="text-center"><i class="fa fa-spinner fa-spin"></i> 加载项目中</h3>
    </div>
    <div v-show="data.name">
      <div class="img-max" :style="`background-image: url('${data.ownerImageurl}')`">
        <!--<img class="img-max" v-lazy="data.ownerImageurl" >-->
        <!--<img class="img-max" src="~assets/images/1.png">-->
      </div>

      <div class="row mt">
        <div class="col-lg-8">
          <div class="card detail">
            <div class="media">
              <div class="media-left media-middle">
                <img class="media-object" v-lazy="data.imageurlSmall" alt="...">
                <!--</a>-->
              </div>
              <div class="media-body">
                <h4 class="media-heading">{{data.name}}</h4>
                <p>
                  {{data.summary}}
                </p>
              </div>
            </div>
            <div class="body">

              <div class="" v-show="data.saleContent">
                <hr>
                <p>{{data.saleContent}}
                </p>
                <hr>
              </div>
              <div class="" v-show="data.content">
                <h3>基本介绍</h3>
                <div class="" v-html="data.content"></div>
              </div>

              <div v-show="data.whitepaperurl">
                <h4>白皮书</h4>
                <p><a :href="data.whitepaperurl" target="_blank">{{data.whitepaperurl}}</a></p>
              </div>
              <div class="" v-show="data.teamurl">
                <h4>团队</h4>
                <p><a :href="data.teamurl" target="_blank">{{data.teamurl}}</a></p>
              </div>
              <div class="" v-show="data.videourl">
                <h4>视频</h4>
                <div v-html="data.videourl"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card detail">
            <h3 class="text-center">{{data.expertRate}}</h3>
            <p class="text-center">专家综合评分</p>
          </div>
          <div class="card detail">
            <p>已募集{{data.allocation}} ETH , 一共{{data.quota}}ETH</p>
            <div class="progress">
              <!--<div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>-->
              <div class="progress-bar" role="progressbar" :style="`width: ${data.allocation/data.quota*100}%`" :aria-valuenow="data.allocation/data.quota*100" aria-valuemin="0" aria-valuemax="100"></div>
              <!--<div class="progress-main" style="width: 50%"></div>-->
            </div>
          </div>
          <div class="card detail">
            <p>ICO数据资料</p>
            <hr>
            <p>时程​</p>
            <p>{{new Date(data.startTime * 1000).format('yyyy-MM-dd')}} - {{new Date(data.endTime * 1000).format('yyyy-MM-dd')}}</p>
            <!--<p>已截止</p>-->
            <!--<p>Day Hour Min Sec</p>-->
            <hr>
            <p>代码 <span class="float-right">{{data.symbol}}</span></p>
            <p>发币时间<span class="float-right">待定</span></p>
            <!--<p>参考价格<span class="float-right">1 {{data.symbol}} = {{data.price}} USD+{{data.fee}}%优惠</span></p>-->
            <p>参考价格<span class="float-right">{{data.price}}</span></p>
            <p>平台<span class="float-right">Ethereum</span></p>
            <p>接受币别<span class="float-right">ETH</span></p>
            <p>软顶<span class="float-right">{{data.softCap ? data.softCap : '无'}}</span></p>
            <p>硬顶<span class="float-right">{{data.hardCap}}</span></p>
            <p>
              <button @click="buy" class="btn btn-lg btn-primary btn-block" v-if="data.status===3">购买</button>

              <button class="btn btn-lg btn-light btn-block" v-if="data.status!==3">已截止</button>
            </p>
            <p>
              <a class="btn btn-lg btn-light btn-block" :href="data.weburl" target="_blank">访造网站</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="buy" title="购买" class="qr-code">
      <div class="d-block">
        <div class="code" ref="code">
          <div class="text">
            <h4 v-show="user.address"> 请用<code>绑定的imToken钱包</code>进行转币购买 </h4>
            <h4 v-show="!user.address"> 请先绑定个人imToken钱包地址：
              <nuxt-link to="/user/set?index=1">绑定</nuxt-link>
            </h4>
          </div>
        </div>
        <input type="text" class="form-control form-control-lg" :value="data.address" readonly="readonly">
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    data () {
      return {
        data: {}
      }
    },
    methods: {
      buy () {
        this.$refs.buy.show()
      },
      init () {
        this.getData()
      },
      getData () {
        console.log(this.$route.params.id)
        let id = this.$route.params.id
        if (!id) {
          location.href = '/'
        }
        let params = {
          url: '/project/details',
          method: 'POST',
          data: {id}
        }
        let callback = (data) => {
          this.data = data.data
          new this.$QRCode(this.$refs.code, {
            width: 130,
            height: 130,
            text: this.data.address
          });
        }
        let error = () => {
          location.href = '/'
        }
        this.$axios.ajax(params, callback, error, error)
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="less">
  .detail-main {
    .media-body {
      padding-left: 15px;
    }
    iframe {
      width: 100%;
    }
    .img-max {
      width: 100%;
      height: 300px;
      background-size: 100% auto;
      background-position: center center;
    }

    .media-object {
      width: 100px;
    }

    .card.detail {
      padding: 15px;
      font-size: 13px;
      margin-bottom: 15px;
    }

    .mt {
      margin-top: 15px;
    }

    .btn-block {
      font-size: 13px;
    }

  }
</style>
