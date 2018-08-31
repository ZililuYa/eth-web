<template>
  <div>
    <!--<button type="button" class="btn btn-primary" @click="sendEmail" :disabled="disEmail">{{texEmail}}</button>-->
    <button type="button" @click="sendEmail" :class="btnClass" :disabled="disabled"><i v-if="disabled" class="fa fa-spinner fa-spin"></i> {{sendText}}</button>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        disabled: false,
        sendText: '发送验证码'
      }
    },
    props: {
      email: String,
      type: Number,
      btnClass: String
    },
    methods: {
      cunEmail () {
        let i = 60
        let time = setInterval(() => {
          this.sendText = i
          i--
          if (i <= 0) {
            window.clearInterval(time)
            this.disabled = false
            this.sendText = '发送验证码'
          }
        }, 1000)
      },
      sendEmail () {
        var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(this.email)) {
          this.$Alert.modal({
            prompt: '邮箱格式不对'
          });
          return
        }
        let callback = (data) => {
//          this.param.mailId = data.id
          this.$emit('input', data.id)
          this.cunEmail()
        }
        let error = (data) => {
          this.$Alert.modal({
            prompt: data.msg
          });
          this.disabled = false
        }
        this.disabled = true
        let params = {
          url: '/mail/send',
          method: 'POST',
          data: {type: 2, email: this.email}
        }
        this.$axios.ajax(params, callback, error, error)
      }
    },
    mounted () {
    }
  }
</script>

<style>

</style>
