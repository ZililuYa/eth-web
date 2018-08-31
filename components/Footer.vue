<template>
  <footer class="main-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="widget">
            <!--<h4 class="title">平台</h4>-->
            <!--<div class="content tag-cloud friend-links">-->
            <!--<a href="/" title="" target="_blank">ETHICO</a>-->
            <!--<a href="https://www.huobi.com/" title="" target="_blank">火币网</a>-->
            <!--<a href="https://www.binance.com" title="" target="_blank">币安网</a>-->
            <!--</div>-->
            <p><br></p>
            <p><br></p>
            <img src="/images/logo1.png" width="100%" alt="">
          </div>
        </div>

        <div class="col-sm-4">
          <div class="widget">
            <!--<h4 class="title">联系我们</h4>-->
            <!--<div class="content tag-cloud">-->
            <!--<a href="tel:13477671208"  target="_blank">13477671208</a>-->
            <!--</div>-->
            <p>
              联系我们
            </p>
            <p>email: <a href="mailto:contact@ico-ethico.pro">contact@ico-ethico.pro</a></p>
            <p>Telegram: <a href="https://t.me/joinchat/H_kv2hAvJ1ZocM0Mcuo1Rg" target="_blank">ethico.pro</a></p>
            <div class="row">
              <div class="col-lg-6">
                <img src="/images/r3.png" width="100%" alt="">
              </div>
              <div class="col-lg-6">
                <img src="/images/r4.jpg" width="100%" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="widget row">
            <!--<h4 class="title">关于我们</h4>-->
            <!--<div class="content friend-links">-->
            <!--<a href="/" title="" target="_blank">平台介绍</a>-->
            <!--<a href="/" title="" target="_blank">团队介绍</a>-->
            <!--</div>-->
            <div class="col-lg-6">
              <p>关于我们</p>
              <p>
                <a href="https://ethico.kf5.com/hc/kb/article/1147629/" target="_blank">简介</a><br>
                <a href="https://ethico.kf5.com/hc/kb/article/1147631/" target="_blank">使用条款</a><br>
                <a href="https://ethico.kf5.com/hc/kb/article/1147632/" target="_blank">隐私政策</a>
              </p>
            </div>
            <div class="col-lg-6">
              <p>平台</p>
              <p>
                <a href="https://ethico.kf5.com/hc/kb/section/1053618/" target="_blank">最新公告</a><br>
                <nuxt-link to="/create">发布项目</nuxt-link><br>
                <nuxt-link to="/list">浏览项目</nuxt-link><br>
                <a href="https://ethico.kf5.com/hc/kb/article/1144449/" target="_blank">投资流程</a><br>
                <a href="https://ethico.kf5.com/hc/kb/article/1147633/" target="_blank">常见问题</a><br>
                <a href="https://ethico.kf5.com/hc/kb/article/1147634/" target="_blank">手续费相关</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

  export default {
    data () {
      return {}
    },
    methods: {
      href (url) {
//        location.href = url
        this.$router.push(url)
      }
    }
  }
</script>

<style lang="less">
  .main-footer {
    background: #202020;
    padding: 35px 0 0;
    color: #959595;
    .widget {
      a {
        color: #959595;
      }
    }
  }
</style>
