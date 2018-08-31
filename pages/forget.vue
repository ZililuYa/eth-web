<template>
  <div class="container reg-main">
    <div class="row">
      <div class="col-md-0 col-lg-4"></div>
      <div class="col-md-12 col-lg-4">
        <form class="needs-validation" onsubmit="return false" novalidate>
          <h5 class="text-center">重置密码 ETHICO</h5>
          <p></p>
          <div class="form-group icon">
            <input type="email" placeholder="请输入邮箱" v-model="param.email" class="form-control form-control-lg" id="email" required>
            <i class="fa fa-envelope"></i>
            <div class="invalid-tooltip">
              请正确输入邮箱
            </div>
          </div>
          <div class="form-group icon">
            <input :type="eye==='fa-eye'?'password':'text'" placeholder="新密码" v-model="param.password" class="form-control form-control-lg" id="password" required>
            <Eye v-model="eye"></Eye>
            <div class="invalid-tooltip">
              请输入密码
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input type="text" maxlength="6" placeholder="验证码" v-model="param.verifyCode" class="form-control form-control-lg" id="mailId" required>
              <SendEmail :type="2" class="input-group-append" v-model="param.mailId" :email="param.email" btnClass="btn btn-primary"></SendEmail>
            </div>
          </div>
          <ResetPwd :param="param" btnClass="btn btn-primary btn-block" class="form-group"></ResetPwd>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import SendEmail from '~/components/SendEmail.vue'
  import ResetPwd from '~/components/ResetPwd.vue'
  import Eye from '~/components/Eye.vue'

  export default {
    components: {
      SendEmail,
      ResetPwd,
      Eye
    },
    data () {
      return {
        eye: 'fa-eye',
        param: {
          email: '',
          password: '',
          verifyCode: '',
          mailId: '',
        }
      }
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style>
</style>
