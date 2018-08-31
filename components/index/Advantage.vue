<template>
  <section class="advantage row">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="icon">
            <div class="advan text-center">
              <!--<i class="fa fa-github"></i>-->
              <img src="/images/1.png" class="img" alt="">
            </div>
          </div>
          <h3 class="">安全储存</h3>
          <p class="">客户存款在离线储存在气密冷库中</p>
        </div>
        <div class="col-lg-4">
          <div class="icon">
            <div class="advan text-center">
              <!--<i class="fa fa-ribbon"></i>-->
              <img src="/images/2.png" class="img" alt="">
            </div>
          </div>
          <h3 class="">ICO项目质量</h3>
          <p class="">ETHICO上列出的项目由我们经验丰富的 <br>
            尽职调查团队进行评估</p>
        </div>
        <div class="col-lg-4">
          <div class="icon">
            <div class="advan text-center">
              <!--<i class="fa fa-users"></i>-->
              <img src="/images/3.png" class="img" alt="">
            </div>
          </div>
          <h3 class="">客户支持</h3>
          <p class="">通过多种主流社交媒体平台提供卓越的客
            户支持</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less">
  .advantage {
    background-color: #181E2F;
    color: #fff;
    padding: 70px 0;
    p, h3 {
      text-align: center;
    }
    p {
      font-size: 14px;
    }
    h3 {
      color: #255ff7;
    }
    .icon {
      position: relative;
      border-radius: 50% !important;
      background: -webkit-linear-gradient(-128deg,#43acd7,#255ff7);
      background: -moz-linear-gradient(-128deg,#43acd7,#255ff7);
      background: -ms-linear-gradient(-128deg,#43acd7,#255ff7);
      background: -o-linear-gradient(-128deg,#43acd7,#255ff7);
      background: linear-gradient(-128deg,#43acd7,#255ff7);
      box-shadow: 0 0 20px rgba(45,115,238,.5);
      margin: 0 auto;
      margin-bottom: 40px;
      width: 200px;
      &:before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        bottom: -20px;
        left: -20px;
        border: 1px solid #255ff7;
        border-radius: 50%;
        transition-duration: 0.5s;
      }
      &:hover:before {
        top: -23px;
        right: -23px;
        bottom: -23px;
        left: -23px;
      }
      .advan {
        width: 200px;
        height: 200px;
        .fa {
          margin-top: (200-100)/2px;
          font-size: 100px;
        }
        .img {
          width: auto;
          height: 100px;
          margin-top:50px;
        }
      }
    }
  }
</style>
