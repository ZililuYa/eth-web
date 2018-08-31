<template>
  <div class="container reg-main">
    <div class="row">
      <div class="col-md-0 col-lg-4"></div>
      <div class="col-md-12 col-lg-4">
        <form class="needs-validation" onsubmit="return false" novalidate>
          <h5 class="text-center">{{$t('register.welcome')}} ETHICO</h5>
          <p></p>
          <div class="form-group icon">
            <!--<label for="email">邮箱</label>-->
            <input type="email" :placeholder="$t('login.mailbox')" v-model="param.email" class="form-control form-control-lg" id="email" required>
            <div class="invalid-tooltip">
              请正确输入邮箱
            </div>
            <i class="fa fa-envelope"></i>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group icon">
            <!--<label for="username">用户名</label>-->
            <input type="text" :placeholder="$t('register.username')" v-model="param.username" class="form-control form-control-lg" id="username" required>
            <div class="invalid-tooltip">
              请输入用户名
            </div>
            <i class="fa fa-user"></i>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <!--<div class="form-group">-->
          <!--<label for="name">手机号</label>-->
          <!--<input type="text" v-model="param.name" class="form-control" id="name2" required>-->
          <!--&lt;!&ndash;<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>&ndash;&gt;-->
          <!--</div>-->
          <div class="form-group icon">
            <!--<label for="password">密码</label>-->
            <input :type="eye==='fa-eye'?'password':'text'" :placeholder="$t('login.password')" v-model="param.password" class="form-control form-control-lg" id="password" required>
            <Eye v-model="eye"></Eye>
            <div class="invalid-tooltip">
              请输入密码
            </div>
            <!--<i class="fa" :class="eye" @click="eyeOpen"></i>-->
          </div>
          <div class="form-group">
            <!--<label for="confirmPassword">确认密码</label>-->
            <input :type="eye==='fa-eye'?'password':'text'" :placeholder="$t('register.password')" v-model="param.confirmPassword" class="form-control form-control-lg" id="confirmPassword" required>
          </div>
          <div class="form-group icon">
            <!--<label for="recommendCode">推荐代码</label>-->
            <input type="text" :placeholder="$t('register.referee')" v-model="param.inviteCode" class="form-control form-control-lg" id="recommendCode" :readonly="!!code">
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
            <i class="fa fa-male"></i>
          </div>
          <div class="form-group">
            <!--<label for="recommendCode">推荐代码</label>-->
            <div class="input-group">
              <input type="text" maxlength="6" :placeholder="$t('register.code')" v-model="param.verifyCode" class="form-control form-control-lg" id="mailId" required>
              <SendEmail :type="1" class="input-group-append" v-model="param.mailId" :email="param.email" btnClass="btn btn-primary"></SendEmail>
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <!--<div class="form-check">-->
          <!--<input type="checkbox" class="form-check-input" id="exampleCheck1">-->
          <!--<label class="form-check-label" for="exampleCheck1">记住密码</label>-->
          <!--</div>-->
          <button type="submit" class="btn btn-primary btn-block" :disabled="disabled"><i class="fa fa-spinner fa-spin" v-show="disabled"></i> {{reg_text}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  //  import ajax from '~/assets/js/ajax.js'
  import axios from 'axios'
  import SendEmail from '~/components/SendEmail.vue'
  import Eye from '~/components/Eye.vue'

  export default {
    components: {
      SendEmail,
      Eye
    },
    data () {
      return {
        eye: 'fa-eye',
        disabled: false,
        reg_text: this.$t('index.register'),
        disEmail: false,
        texEmail: this.$t('register.send'),
        code: '',
        param: {
          email: '',
          password: '',
          inviteCode: '',
          confirmPassword: '',
          verifyCode: '',
          mailId: '',
          username: ''
        }
      }
    },
    methods: {
      init () {
        this.code = this.$route.query.code
        if (this.code) {
          this.param.inviteCode = this.code
        }


        var forms = document.getElementsByClassName('needs-validation');
        let vm = this
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            console.log(form)
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              if (vm.param.password !== vm.param.confirmPassword) {
                vm.$Alert.modal({
                  prompt: '两次输入的密码不一致'
                });
              } else {
                vm.btn_start(1)
                vm.submit()
              }
            }
            form.classList.add('was-validated');
            return false
          }, false);
        });
      },
      submit () {
        let params = {
          url: '/user/register',
          method: 'POST',
          data: this.param
        };
        let callback = (data) => {
          this.$Alert.message({
            text: this.$t('register.success'),
            time: 2000
          });
          setTimeout(() => this.$router.push('/login'), 2000)
        }
        let error = (data) => {
          this.$Alert.modal({
            prompt: data.msg
          });
          this.btn_start(0)
        }
//        let callback = (data) => {
//          console.log(data)
//        }
        this.$axios.ajax(params, callback, error, error)
      },
      btn_start (is) {
        if (is) {
          this.disabled = true
          this.reg_text = this.$t('register.loading')
        } else {
          this.disabled = false
          this.reg_text = this.$t('index.register')
        }
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style>
</style>
