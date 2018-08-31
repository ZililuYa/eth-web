<template>
  <div>
    <button type="button" @click="submitNewPwd" :class="btnClass" :disabled="disabled"><i class="fa fa-spinner fa-spin" v-show="disabled"></i> {{btnText}}</button>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        disabled: false,
        infoText: '',
        btnText: '重置密码'
      }
    },
    props: {
      param: Object,
      btnClass: String
    },
    methods: {
      infoOpen (msg) {
        this.$Alert.modal({
          prompt: msg
        });
      },
      submitNewPwd () {

        if (!this.param.email) return this.infoOpen('请输入邮箱')
        if (!this.param.mailId) return this.infoOpen('请发送邮件')
        if (!this.param.password) return this.infoOpen('请输入新密码')
        if (!this.param.verifyCode) return this.infoOpen('请输入验证码')

        this.btnStart(1)

        let params = {
          url: '/user/pwd',
          method: 'POST',
          data: this.param
        }

        let callback = (data) => {
          console.log(data)
          this.infoOpen('重置密码成功')
          setTimeout(() => {
            location.href = '/'
          }, 2000)
        }

        let error = (data) => {
          this.infoOpen(data.msg)
          this.btnStart(0)
        }

        this.$axios.ajax(params, callback, error, error)
      },
      btnStart (is) {
        if (is) {
          this.disabled = true
          this.btnText = '正在重置密码，请稍后'
        } else {
          this.disabled = false
          this.btnText = '重置密码'
        }
      }
    },
    mounted () {
    }
  }
</script>

<style>

</style>
