<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <b-nav @click.native="alert" tabs>
          <b-nav-item :active="index === k" @click="click(k)" :key="k" v-for="(i, k) in list">{{i}}</b-nav-item>
        </b-nav>
      </div>

      <div class="container">
        <div class="row" v-if="index === 0">
          <div class="col-lg-3"></div>
          <div class="col-lg-6 user-set">
            <p><br></p>
            <h3 class="text-center">基本资料</h3>
            <div class="form-group">
              <label for="">用户名称</label>
              <input type="text" v-model="param.username" class="form-control form-control-lg">
            </div>
            <div class="form-group">
              <label for="">Telegram ID</label>
              <input type="text" v-model="param.telegram" class="form-control form-control-lg">
            </div>
            <div class="form-group">
              <label for="">微信(Wechat) ID</label>
              <input type="text" v-model="param.wechat" class="form-control form-control-lg">
            </div>
            <div class="form-group">
              <label for="">生日</label>
              <!--<input type="text" v-model="param.date" class="form-control form-control-lg">-->
              <flat-pickr
                v-model="param.date"
                :config="config"
                class="form-control form-control-lg">
              </flat-pickr>
            </div>

            <button class="btn btn-primary btn-block">更新</button>
            <p><br></p>
            <p><br></p>
          </div>
        </div>
        <div class="row" v-if="index === 1">
          <div class="col-lg-3"></div>
          <div class="col-lg-6 user-set" v-if="!user.address">
            <p><br></p>
            <h2 class="text-center">绑定imToKen钱包地址</h2>
            <hr/>
            <p>
              <button @click="$refs.token.show()" class="btn btn-primary btn-lg btn-block">点击绑定</button>
            </p>
            <!--<div class="alert alert-primary" role="alert">-->
            <!--请向系统钱包转账 <b>0个ETH</b> 进行绑定-->
            <!--</div>-->
          </div>
          <div class="col-lg-12 user-set" v-if="user.address">
            <p><br></p>
            <h2>imToken钱包已经绑定</h2>
            <hr/>
            <p>
              <input type="text" class="form-control form-control-lg" readonly="readonly" :value="user.address">
            </p>
            <!--<div class="alert alert-primary" role="alert">-->
            <!--修改个人钱包请联系 <b>管理员</b>-->
            <!--</div>-->
          </div>
        </div>
        <div class="row" v-if="index === 2">
          <div class="col-lg-3"></div>
          <div class="col-lg-6">
            <p><br></p>
            <p><br></p>
            <div class="form-group">
              <input type="text" class="form-control-lg form-control" v-model="param_pwd.password" placeholder="请输入新密码">
            </div>
            <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control-lg form-control" placeholder="请输入验证码" v-model="param_pwd.verifyCode">
                <SendEmail :type="2" class="input-group-append" v-model="param_pwd.mailId" :email="param_pwd.email" btnClass="btn btn-primary"></SendEmail>
              </div>
            </div>
            <ResetPwd :param="param_pwd" btnClass="btn btn-primary btn-block" class="form-group"></ResetPwd>
          </div>
        </div>
      </div>

    </div>

    <b-modal ref="token" title="绑定imToken钱包地址" class="qr-code">
      <div class="d-block">
        <div class="code" ref="code">
          <div class="text">
            <h4> 请向系统钱包转 <code>0个ETH</code> 进行绑定 </h4>
          </div>
        </div>
        <input type="text" class="form-control form-control-lg" :value="user.system_address" readonly="readonly">
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { Mandarin } from 'flatpickr/dist/l10n/zh';
  import SendEmail from '~/components/SendEmail.vue'
  import ResetPwd from '~/components/ResetPwd.vue'

  export default {
    components: {
      SendEmail,
      ResetPwd
    },
    props: {
      user: Object
    },
    data () {
      return {
        param_pwd: {
          password: '',
          verifyCode: '',
          mailId: '',
          email: ''
        },
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'Y-m-d',
          altInput: true,
          dateFormat: 'U',
          locale: Mandarin, // locale for this instance only
        },
        param: {
          username: '',
          telegram: '',
          wechat: '',
          date: ''
        },
        index: 0,
        list: ['基本资料', 'imToken钱包', '修改密码']
      }
    },
    mounted () {
      new this.$QRCode(this.$refs.code, {
        width: 130,
        height: 130,
        text: this.user.system_address
      });
      this.param_pwd.email = this.user.email
      this.init()
    },
    methods: {
      click (k) {
        this.index = k
      },
      init () {
        if (this.$route.query.index) {
          this.index = parseInt(this.$route.query.index)
        }
        this.param.username = this.user.username
      }
    }
  }
</script>

<style>
  .user-set {
    width: 100%;
  }
</style>
