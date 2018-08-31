<template>
  <div class="container invest">
    <div class="row">
      <div class="col-lg-12">
        <div class="col-lg-6 row">
          <select class="form-control" v-model="status" @change="init">
            <option :value="0">全部</option>
            <option :value="1">投资中</option>
            <option :value="2">等待发币</option>
            <option :value="3">完成</option>
            <option :value="4">退款完成</option>
          </select>
        </div>
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
            <th>订单号</th>
            <th>项目</th>
            <th>金额</th>
            <th>参考价格</th>
            <th>状态</th>
            <th>交易时间</th>
            <!--<th>手续费</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, k) in list" :key="k">
            <td>{{i.id}}</td>
            <td>{{i.projectName}}</td>
            <td>{{i.pay}}</td>
            <td>{{i.price}}</td>
            <td>
              <span v-if="i.status === 1">投资中</span>
              <span v-if="i.status === 2">等待发币</span>
              <span v-if="i.status === 3">完成</span>
              <span v-if="i.status === 4">退款完成</span>
            </td>
            <td>{{new Date(i.createTime).format('yyyy-MM-dd')}}</td>
            <!--<td>{{i.pay}}</td>-->
            <!--<td>{{i.poundage}}</td>-->
            <!--<td>{{i.projectId}}</td>-->
            <!--<td>{{i.quota}}</td>-->
            <!--<td>{{i.status}}</td>-->
            <!--<td>{{i.usedGas}}</td>-->
          </tr>
          <tr>
            <td colspan="10" class="text-center">
              <i class="fa fa-spinner fa-spin" v-show="loading"></i>
              <span v-if="!loading" v-show="!list.length"> 暂无投资记录 <nuxt-link to="/list">转到项目列表</nuxt-link> </span>
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
          url: '/order/list',
          method: 'POST',
          data: {status: this.status}
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
