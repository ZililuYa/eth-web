<template>
  <div class="container login-man">
    <!--<div class="row">-->
    <!--<div class="col-md-0 col-lg-4"></div>-->
    <!--<div class="col-md-12 col-lg-4">-->
    <!--<form class="needs-validation" onsubmit="return false" novalidate>-->

    <!--<div class="form-group">-->
    <!--&lt;!&ndash;<label for="name">用户名 / 邮箱 / 手机号</label>&ndash;&gt;-->
    <!--<label for="email">邮箱</label>-->
    <!--<input type="text" v-model="param.email" class="form-control" id="email" required>-->
    <!--<div class="invalid-tooltip">-->
    <!--请输入邮箱-->
    <!--</div>-->
    <!--&lt;!&ndash;<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="form-group">-->
    <!--<label for="password">密码</label>-->
    <!--<input type="password" v-model="param.password" class="form-control" id="password" required>-->
    <!--<div class="invalid-tooltip">-->
    <!--请输入密码-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div class="form-check">&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="checkbox" class="form-check-input" id="exampleCheck1">&ndash;&gt;-->
    <!--&lt;!&ndash;<label class="form-check-label" for="exampleCheck1">记住密码</label>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<p><a href="">忘记密码</a></p>-->
    <!--<button type="submit" class="btn btn-primary btn-sm" :disabled="disabled"><i class="fa fa-circle-o-notch fa-spin" v-show="disabled"></i> {{reg_text}}</button>-->
    <!--</form>-->
    <!--</div>-->
    <!--</div>-->
    <div class="col-lg-12">
      <form class="form-signin needs-validation" onsubmit="return false" novalidate>
        <!--<h2 class="text-center"><i class="fa fa-bitcoin"></i> ETHICO</h2>-->
        <h5 class="text-center">{{$t('login.welcome')}} ETHICO</h5>
        <p></p>
        <div class="form-group icon">
          <label for="inputEmail" class="sr-only">请输入邮箱</label>
          <input type="email" id="inputEmail" class="form-control form-control-lg" v-model="param.email" :placeholder="$t('login.mailbox')" required autofocus>
          <i class="fa fa-envelope"></i>
        </div>
        <div class="form-group icon">
          <label for="inputPassword" class="sr-only">请输入密码</label>
          <input :type="eye==='fa-eye'?'password':'text'" id="inputPassword" class="form-control form-control-lg" v-model="param.password" :placeholder="$t('login.password')" required>
          <!--<i class="fa" :class="eye" @click="eyeOpen"></i>-->
          <Eye v-model="eye"></Eye>
        </div>
        <!--<div class="checkbox">-->
        <!--<label>-->
        <!--<input type="checkbox" value="remember-me"> Remember me-->
        <!--</label>-->
        <!--</div>-->
        <div class="text-right">
          <p>
            <nuxt-link to="/forget">{{$t('login.forger')}}？</nuxt-link>
          </p>
        </div>
        <!--<button class="btn btn-lg btn-primary btn-block" id="check" type="submit">Sign in</button>-->
        <button type="submit" class="btn btn-primary  btn-block" :disabled="disabled"><i class="fa fa-spinner fa-spin" v-show="disabled"></i> {{reg_text}}</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import Eye from '~/components/Eye.vue'

  export default {
    components: {
      Eye
    },
    data () {
      return {
        eye: 'fa-eye',
        param: {
          email: '',
          password: ''
        },
        reg_text: this.$t('index.login'),
        disabled: false
      }
    },
    methods: {
      getInfo () {
        let params = {
          url: '/user/info',
          method: 'POST',
          data: {}
        }
        let callback = (data) => {
          Cookie.set('user', data)
          this.$Alert.message({
            text: this.$t('login.success'),
            time: 2000
          });
          setTimeout(() => location.href = '/', 2000)

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
      submit () {
        let params = {
          url: '/user/login',
          method: 'POST',
          data: this.param
        }
        let callback = (data) => {
//          console.log(data)
//          this.info_open('登录成功')
          Cookie.set('token', data.token)
          this.getInfo()
//          setTimeout(() => this.$router.push('/'), 2000)
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
          this.reg_text = this.$t('login.loading')
        } else {
          this.disabled = false
          this.reg_text = this.$t('index.login')
        }
      }
    },
    mounted () {
//      ajax.post(123)
//      ajax('123')
//      window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let vm = this
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            vm.btn_start(1)
            vm.submit()
          }
          form.classList.add('was-validated');
        }, false);
      });
//      });
    }
  }
</script>

<style>
  .form-signin {
    padding-top: 5rem;
    max-width: 350px;
    margin: 0 auto;
  }
</style>
