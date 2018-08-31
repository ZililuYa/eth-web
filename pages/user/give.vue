<template>
  <div class="container invest">
    <div class="row">
      <div class="col-lg-12">
        <!--<div class="col-lg-6 row">-->
          <!--<select class="form-control" v-model="status" @change="init">-->
            <!--<option :value="0">全部</option>-->
            <!--<option :value="1">投资中</option>-->
            <!--<option :value="2">等待发币</option>-->
            <!--<option :value="3">退款</option>-->
            <!--<option :value="4">完成</option>-->
          <!--</select>-->
        <!--</div>-->
        <table class="table">
          <thead>
          <tr>
            <!--<th>ID</th>-->
            <!--<th>code</th>-->
            <!--<th>fee</th>-->
            <!--<th>finishPlan</th>-->
            <!--<th>pay</th>-->
            <!--<th>poundage</th>-->
            <!--<th>projectId</th>-->
            <!--<th>quota</th>-->
            <!--<th>status</th>-->
            <!--<th>usedGas</th>-->
            <th width="1">#</th>
            <th>Hash</th>
            <th>发币时间</th>
            <th>项目名称</th>
            <th>投资金额</th>
            <th>比例</th>
            <th>发币数量</th>
            <!--<th>手续费</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, k) in list" :key="k">
            <td>{{k}}</td>
            <td>
              <div class="ellipsis"><a :href="`https://rinkeby.etherscan.io/tx/${i.txhash}`" target="_blank">{{i.txhash}}</a></div>
            </td>
            <td>{{new Date(i.createTime).format('yyyy-MM-dd hh:mm')}}</td>
            <td>{{i.projectName}}</td>
            <td>{{i.totality}} ETH</td>
            <td>{{i.ratio}}</td>
            <td>{{i.quantity}} {{i.name}}</td>
          </tr>
          <tr>
            <td colspan="10" class="text-center">
              <i class="fa fa-spinner fa-spin" v-show="loading"></i>
              <span v-if="!loading" v-show="!list.length"> 暂无发布记录 </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        loading: true,
        list: [],
        status: 0
      }
    },
    methods: {
      init () {
        this.loading = true
        this.list = []
        let params = {
          url: '/order/logs',
          method: 'POST',
          data: {}
        }
        let callback = (data) => {
          this.list = data.data_set
          this.loading = false
        }
        let error = () => {
          this.loading = false
        }
        this.$axios.ajax(params, callback, error, error)
      },
      getData () {
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="less">
  .invest {
    .row {
      padding-bottom: 50px;
      .table {
        font-size: 13px;
        th {
          border-top: 0;
        }
      }
    }
  }
</style>
