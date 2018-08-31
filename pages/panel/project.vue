<template>
  <div class="container invest">
    <div class="row">
      <div class="col-lg-6">
        <select class="form-control" v-model="status" @change="getData">
          <option :value="1">已创建</option>
          <option :value="2">已审核</option>
          <option :value="3">已开始</option>
          <option :value="4">已完成</option>
          <option :value="5">已结束</option>
          <option :value="6">已删除</option>
        </select>
      </div>
      <div class="col-lg-6 text-right">
        <nuxt-link to="/panel/createProject" tag="button" class="btn btn-primary"><i class="fa fa-plus"></i> 创建项目</nuxt-link>
        <!--<nuxt-link to="/panel/createProject" tag="button" class="btn btn-primary">创建项目</nuxt-link>-->
      </div>
      <p>&nbsp;</p>
      <div class="col-lg-12">
        <table class="table">
          <thead>
          <tr>
            <th width="1">ID</th>
            <th>项目名称</th>
            <th>代码</th>
            <th class="text-right">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, k) in list" :key="k">
            <td class="text-center">{{k}}</td>
            <td><a :href="`/detail/${i.id}`" target="_blank">{{i.name}}</a></td>
            <td>{{i.symbol}}</td>
            <td class="text-right">
              <!--<button class="btn btn-sm" @click="updateStatus(i.id, status)">修改状态</button>-->
              <button class="btn btn-sm btn-dark" @click="order(i.id)">订单管理</button>
              <button class="btn btn-sm" v-if="status===1" @click="examine(i.id)">审核</button>
              <button class="btn btn-sm" v-if="status===2" @click="publish(i.id)">发布</button>
              <button class="btn btn-sm" v-if="status===3" @click="complete(i.id)">私募完成</button>
              <button class="btn btn-sm" v-if="status===4" @click="end(i.id)">结束</button>
              <button class="btn btn-sm btn-primary" @click="updateProject(i.id)"><i class="fa fa-edit" v-if="icon"></i> 编辑</button>
              <button class="btn btn-sm btn-dark" v-if="status===6" @click="updateStatus(i.id, status)">提取</button>
              <button class="btn btn-sm btn-danger" v-if="status!==6" @click="remove(i.id)"><i class="fa fa-remove" v-if="icon"></i> 删除</button>
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

    <b-modal ref="examine" title="审核" @ok="ok">
      <div class="d-block">
        <b-form-group>
          <b-form-radio-group v-model="selected">
            <b-form-radio :value="2">审核通过</b-form-radio>
            <b-form-radio :value="6">审核不通过</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
    </b-modal>
    <b-modal ref="update" title="修改状态" @ok="ok">
      <div class="d-block">
        <b-form-group>
          <b-form-radio-group v-model="selected">
            <b-form-radio :value="1">创建</b-form-radio>
            <b-form-radio :value="2">审核</b-form-radio>
            <b-form-radio :value="3">开始</b-form-radio>
            <b-form-radio :value="4">完成</b-form-radio>
            <b-form-radio :value="5">结束</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        noInfo: '暂无相关项目记录',
        icon: false,
        selected: 0,
        info_text: '',
        id: '',
        status: 1,
        list: []
      }
    },
    methods: {
      updateProject (id) {
        this.$router.push('/panel/createProject?id=' + id)
      },
      end (id) {
        this.selected = 5
        this.id = id
        this.$Alert.modal({
          prompt: '确认结束该项目吗？',
          jumpFn: () => {
            this.update(this.selected)
          }
        })
      },
      complete (id) {
        this.selected = 4
        this.id = id
        this.$Alert.modal({
          prompt: '确认完成了该项目吗？',
          jumpFn: () => {
            this.update(this.selected)
          }
        })
      },
      publish (id) {
        this.selected = 3
        this.id = id
        this.$Alert.modal({
          prompt: '确认发布项目吗？',
          jumpFn: () => {
            this.update(this.selected)
          }
        });
      },
      order (id) {
        this.$router.push('/panel/' + id + '/order')
      },
      examine (id) {
        this.selected = 2
        this.id = id
        this.$refs.examine.show()
      },
      ok () {
//        alert(12)
        this.update(this.selected)
      },
      updateStatus (id, status) {
        this.id = id
        this.selected = status
        this.$refs.update.show()
      },
      init () {
        this.getData()
      },
      remove (id) {
        this.id = id
        this.$Alert.modal({
          prompt: '确定删除吗？',
          jumpFn: () => {
            this.selected = 6;
            this.update(this.selected)
          }
        });
      },
      update (status) {
        let params = {
          url: '/project/update/status',
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
          url: '/project/admin/list',
          method: 'POST',
          data: {status: this.status}
        }
        let callback = (data) => {
          this.list = data.data_set
          this.noInfo = '暂无相关项目记录'
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
