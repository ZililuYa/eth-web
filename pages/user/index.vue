<template>
  <div class="container user-index">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="title">
            资金
          </div>
          <div class="main">
            <p><i class="fab fa-ethereum"></i> Ethereum 以太币 <span class="float-right">{{user.balance ? user.balance : 0}} ETH</span></p>
          </div>
        </div>
      </div>
      <!--<div class="col-lg-6">-->
        <!--<div class="card">-->
          <!--<div class="title">-->
            <!--币名-->
          <!--</div>-->
          <!--<div class="main">-->
            <!--<p>ETHICO <span class="float-right">1000</span></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="col-lg-12">
        <div class="card">
          <div class="title">近10笔​交易纪录</div>
          <b-nav tabs>
            <b-nav-item :active="index === k" @click="click(k)" :key="k" v-for="(i, k) in list">{{i}}</b-nav-item>
          </b-nav>
          <div class="main" v-if="index===0">
            <table class="table">
              <thead>
              <tr class="thead">
                <th width="100">Hash</th>
                <th class="text-center">交易时间</th>
                <th class="text-center">性质</th>
                <th class="text-center">金额</th>
                <th class="text-center">手续费</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(i, k) in ethData" :key="k">
                <td>
                  <div class="ellipsis"><a :href="`https://rinkeby.etherscan.io/tx/${i.txhash}`" target="_blank">{{i.txhash}}</a></div>
                </td>
                <td class="text-center">{{new Date(i.createTime).format('yyyy-MM-dd')}}</td>
                <td class="text-center">
                  <!--<span v-if="i.blockType === 0">转出</span>-->
                  <!--<span v-if="i.blockType === 1">转入</span>-->
                  {{i.remark}}
                </td>
                <td class="text-center">{{i.quantity}}</td>
                <td class="text-center">{{i.gas}}</td>
              </tr>
              <tr>
                <td colspan="10" class="text-center">
                  <i class="fa fa-spinner fa-spin" v-if="ethLoading"></i>
                  <span v-if="!ethLoading" v-show="!ethData.length">暂无</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--<div class="main" v-if="index===1">-->
            <!--<table class="table">-->
              <!--<thead>-->
              <!--<tr class="thead">-->
                <!--<th>币名</th>-->
                <!--<th>性质</th>-->
                <!--<th>金额</th>-->
                <!--<th>交易时间</th>-->
              <!--</tr>-->
              <!--</thead>-->
              <!--<tbody>-->
              <!--<tr>-->
                <!--<td colspan="10" class="text-center">暂无</td>-->
              <!--</tr>-->
              <!--</tbody>-->
            <!--</table>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        index: 0,
        ethData: [],
        ethLoading: true,
        list: ['ETH']
      }
    },
    methods: {
      init () {

        let params = {
          url: '/wallet/log',
          method: 'POST',
          data: {
            type: 0,
            address: this.user.address
          }
        }


        let error = (data) => {
          this.ethLoading = false
        }

        let callback = (data) => {
//          this.ethData = data.data_set
          for (let i of data.data_set) {
            this.ethData.push(i)
          }
          params = {
            url: '/wallet/log',
            method: 'POST',
            data: {
              type: params.data.type + 1,
              address: this.user.address
            }
          }
          if (params.data.type >= 2) return

          this.$axios.ajax(params, callback, error, error)

          this.ethLoading = false
        }

        this.$axios.ajax(params, callback, error, error)
//        params.data.type = 1
//        this.$axios.ajax(params, callback, error, error)

      },
      click (k) {
        this.index = k
      }
    },
    components: {},
    props: {
      user: Object
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="less">
  .user-index {
    .thead {
      font-size: 13px;
      th {
        border-top: 0;
      }
    }
    .nav-tabs {
      margin-top: 20px;
    }
    .col-lg-6, .col-lg-12 {
      padding-bottom: 30px;
      .card {
        border: 1px solid #9B9FA5;
        .title {
          padding: 10px 20px;
          font-size: 14px;
          /*border-bottom: 1px solid #9B9FA5;*/
          font-weight: bold;
          background-color: #007bff;
          margin-top: -1px;
          margin-left: -1px;
          box-shadow: 1px 0 0 #007bff;
          color: #fff;
        }
        .main {
          padding: 20px;
        }
      }
    }
  }
</style>
