<template>
  <div class="container extension">
    <div class="row">
      <div class="col-lg-12">
        <!--<div class="col-lg-6 row">-->
          <!--<select class="form-control">-->
            <!--<option>全部</option>-->
            <!--<option>男</option>-->
            <!--<option>女</option>-->
          <!--</select>-->
        <!--</div>-->
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" >您的推广链接</span>
          </div>
          <input type="text" class="form-control form-control-lg" :value="`https://ethico.pro/reg?code=${user.promoCode}`" readonly="readonly">
        </div>
        <p><br></p>
        <h3>您邀请的用户</h3>
        <hr>
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
            <th>#</th>
            <th>名称</th>
            <th>邮箱</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, k) in list" :key="k">
            <td>{{k}}</td>
            <td>{{i.username}}</td>
            <td>{{i.email}}</td>
          </tr>
          <tr v-if="!list.length" class="text-center">
            <td colspan="10">暂无
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
    props: {
      user: Object
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      init () {
        let params = {
          url: '/user/promo',
          method: 'POST',
          data: {}
        }
        let callback = (data) => {
          this.list = data.list
        }
        let error = () => {
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
  .extension {
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
