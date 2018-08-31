<template>
  <div class="container invest">
    <div class="row">
      <h6 class="col-lg-12">
        <nuxt-link to="/panel/project">项目管理</nuxt-link>&emsp;<i class="fa fa-angle-right"></i>&emsp;订单管理
        <hr>
      </h6>
      <!--<div class="col-lg-6">-->
      <!--<select class="form-control" v-model="status" @change="getData">-->
      <!--<option :value="1">已创建</option>-->
      <!--<option :value="2">已审核</option>-->
      <!--<option :value="3">已开始</option>-->
      <!--<option :value="4">已完成</option>-->
      <!--<option :value="5">已结束</option>-->
      <!--<option :value="6">已删除</option>-->
      <!--</select>-->
      <!--</div>-->
      <!--<div class="col-lg-6 text-right">-->
      <!--<nuxt-link to="/panel/createProject" tag="button" class="btn btn-primary"><i class="fa fa-plus"></i> 创建项目</nuxt-link>-->
      <!--&lt;!&ndash;<nuxt-link to="/panel/createProject" tag="button" class="btn btn-primary">创建项目</nuxt-link>&ndash;&gt;-->
      <!--</div>-->
      <!--<p>&nbsp;</p>-->
      <div class="col-lg-12">
        <table class="table">
          <thead>
          <tr>
            <th width="1">#</th>
            <th>项目名称</th>
            <th>用户名称</th>
            <th>比例</th>
            <th>已投金额</th>
            <th>确认金额</th>
            <th>总量</th>
            <th class="text-right">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, k) in list" :key="k">
            <td class="text-center">{{k}}</td>
            <td><a :href="`/detail/${i.id}`" target="_blank">{{i.projectName}}</a></td>
            <td>{{i.userName}}</td>
            <td>{{i.ratio}}</td>
            <td>{{i.pay}}</td>
            <td>{{i.quantity}}</td>
            <td>{{i.total}}</td>
            <td class="text-right">
              <!--<button class="btn btn-sm" @click="updateStatus(i.id, status)">修改状态</button>-->
              <button class="btn btn-sm btn-info" v-if="i.status !== 2" @click="complete(i.id)">确认订单</button>
              <button class="btn btn-sm btn-primary" @click="give(i.id)">发币</button>
              <button class="btn btn-sm btn-danger" @click="refund(i.id)">退款</button>
            </td>
          </tr>
          <tr v-if="!list.length" class="text-center">
            <td colspan="10" v-html="noInfo">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="give" title="发币" @ok="ok(1)">
      <div class="d-block">
        <div class="form-group">
          <input type="text" v-model="giveData.quantity" class="form-control" placeholder="quantity">
        </div>
        <div class="form-group">
          <input type="text" v-model="giveData.txhash" class="form-control" placeholder="txhash">
        </div>
      </div>
    </b-modal>
    <b-modal ref="refund" title="退款" @ok="ok(2)">
      <div class="d-block">
        <div class="form-group">
          <input type="text" v-model="refundData.quantity" class="form-control" placeholder="quantity">
        </div>
        <div class="form-group">
          <input type="text" v-model="refundData.txhash" class="form-control" placeholder="txhash">
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        noInfo: '暂无相关订单记录',
        icon: false,
        id: '',
        url: '',
        giveData: {
          id: '',
          quantity: '',
          txhash: ''
        },
        refundData: {
          id: '',
          quantity: '',
          txhash: ''
        },
        status: 1,
        list: []
      }
    },
    methods: {
      updateProject (id) {
        this.$router.push('/panel/createProject?id=' + id)
      },
      complete (id) {
//        this.selected = 4
        this.$Alert.modal({
          prompt: '确认订单吗？',
          jumpFn: () => {
            let params = {
              url: '/order/admin/confirm',
              method: 'POST',
              data: {id}
            }
            let callback = () => {
              this.$Alert.message({
                text: '操作成功'
              });
              this.getData()
            }
            let error = () => {
              this.$Alert.modal({
                prompt: '操作失败'
              });
            };
            this.$axios.ajax(params, callback, error, error)
          }
        })
      },
      info (msg) {
        this.$Alert.message({
          iconClass: 'error',
          text: msg
        });
      },
      ok (i) {
        let params = {
          url: this.url,
          method: 'POST'
        }
        if (i === 1) {
          if (!this.giveData.quantity) return this.info('quantity不能为空')
          if (!this.giveData.txhash) return this.info('txhash不能为空')
          this.giveData.quantity = parseFloat(this.giveData.quantity)
          params.data = this.giveData
        }
        if (i === 2) {
          if (!this.refundData.quantity) return this.info('quantity不能为空')
          if (!this.refundData.txhash) return this.info('txhash不能为空')
          this.refundData.quantity = parseFloat(this.refundData.quantity)
          params.data = this.refundData
        }
        let callback = () => {
          this.$Alert.message({
            text: '操作成功'
          });
          this.getData()
        }
        let error = () => {
          this.$Alert.modal({
            prompt: '操作失败'
          });
        };
        this.$axios.ajax(params, callback, error, error)
      },
      give (id) {
        this.giveData.id = id
        this.url = '/order/admin/currency'
        this.$refs.give.show()
      },
      refund (id) {
        this.refundData.id = id
        this.url = '/order/admin/refund'
        this.$refs.refund.show()
      },
      init () {
        this.id = this.$route.params.id
        console.log(this.$route.params.id)
        this.getData()
      },
      update (status) {
        let params = {
          url: '/project/update',
          method: 'POST',
          data: {status, id: this.id}
        }
        let callback = () => {
          this.$Alert.message({
            text: '操作成功'
          });
          this.getData()
        }
        let error = () => {
          this.$Alert.modal({
            prompt: '操作失败'
          });
        };
        this.$axios.ajax(params, callback, error, error)
      },
      getData () {
        this.list = []
        this.noInfo = '<i class="fa fa-spinner fa-spin"></i>  加载中'
        let params = {
          url: '/order/admin/list',
          method: 'POST',
          data: {status: 0, projectId: this.id}
        }
        let callback = (data) => {
          this.list = data.data_set
          this.noInfo = '暂无相关订单记录'
        }
        let error = () => {
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
