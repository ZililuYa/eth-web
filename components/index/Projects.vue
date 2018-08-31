<template>
  <div class="our-projects container">
    <h3>
      <img class="va-top" src="/images/b1.png" alt=""> 我们的项目
      <nuxt-link to="/list" class="more float-right">更多</nuxt-link>
    </h3>
    <swiper :options="swiperOption" style="height: 500px">
      <swiper-slide v-for="(i, k) in list" :key="k" v-if="k<=5">

        <!--<a href="">-->
        <!--<img class="show-img" src="https://leekico.oss-ap-southeast-1.aliyuncs.com/5afd7cc2c17cc.jpg" alt="">-->
        <!--</a>-->
        <!--<h3 class="h3">-->
        <!--<a href="">GRE - ETH</a>-->
        <!--</h3>-->

        <!--<div class="progress-main">-->
        <!--<div class="progress-line"><i style="width:50%;"></i></div>-->
        <!--<div class="progress-value">50%</div>-->
        <!--</div>-->

        <!--<table class="table-main" border="0" cellspacing="0" cellpadding="0">-->
        <!--<tr>-->
        <!--&lt;!&ndash;<th>TARGET</th>&ndash;&gt;-->
        <!--&lt;!&ndash;<th>TIME REMAINING</th>&ndash;&gt;-->
        <!--&lt;!&ndash;<th>SUPPORTERS</th>&ndash;&gt;-->
        <!--<th>目标</th>-->
        <!--<th>剩余时间</th>-->
        <!--<th>支持单位</th>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td><p>10000000</p>-->
        <!--<p>RISK</p></td>-->
        <!--<td><p>30天</p></td>-->
        <!--<td><p>130</p></td>-->
        <!--</tr>-->
        <!--</table>-->

        <nuxt-link class="project-item" style="width: 100%" :to="'/detail/'+i.id">
          <div class="card" style="width: 100%">
            <img class="card-img-top" v-lazy="i.imageurlBig">
            <div class="card-body">
              <h5 class="card-title">{{i.name}}</h5>
              <p class="card-text">{{i.summary}}</p>
              <p class="row">
                <span class="col-lg-12">已经募集：{{i.allocation}} ETH</span>
                <span class="col-lg-12">开始时间：{{new Date(i.startTime * 1000).format('yyyy-MM-dd hh:mm')}}</span>
                <span class="col-lg-12">结束时间：{{new Date(i.endTime * 1000).format('yyyy-MM-dd hh:mm')}}</span>
              </p>
            </div>
            <div class="progress progress-sm">
              <div class="progress-bar" role="progressbar" :style="`width: ${i.allocation/i.quota*100}%`" :aria-valuenow="i.allocation/i.quota*100" aria-valuemin="0" aria-valuemax="100"></div>
              <!--<div class="progress-bar" role="progressbar" :style="`width: 50%`" :aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>-->
              <!--<div class="progress-main" style="width: 50%"></div>-->
            </div>
          </div>
        </nuxt-link>

      </swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [],
        status: 1,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
//            el: '.swiper-pagination',
//            clickable: true
          }
        }
      }
    },
    methods: {
      getData (num) {
        if (num) this.status = num
        this.loading = true
        let params = {
          url: '/project/list',
          method: 'POST',
          data: {active: this.status, name: this.name}
        }
        let callback = (data) => {
          this.list = data.data_set
//          if (this.status === 1)
//            this.options[this.status - 1].text = `正在进行中 (${this.list.length})`
//          if (this.status === 2)
//            this.options[this.status - 1].text = `已经结束 (${this.list.length})`
//          this.loading = false
        }
        let error = (data) => {
          this.$Alert.modal({
            prompt: data.msg
          });
        }
//        let callback = (data) => {
//          console.log(data)
//        }
        this.$axios.ajax(params, callback, error)
      },
      init () {
        this.getData()
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style lang="less">
  .our-projects {
    margin-top: 50px;
    .top {
      vertical-align: top;
    }
    .swiper-container {
      margin-top: 30px;
      .table-main {
        font-size: 12px;
        width: 100%;
        margin-top: 30px;
        th {
          border-bottom: 1px solid #C8C9CD;
          text-align: center;
          color: #9b9fa9;
          padding: 5px 0;
        }
        td {
          vertical-align: top;
          p {
            text-align: center;
            line-height: 20px;
            padding: 0;
            margin: 0;
            color: #e80d17;
            font-weight: bold;
          }
        }
      }
      .show-img {
        width: 100%;
      }
      .h3 {
        margin-top: 10px;
        margin-bottom: 20px;
        height: 1.5em;
        line-height: 1em;
        -webkit-line-clamp: 3;
        a {
          font-size: 24px;
          color: #192031 !important;
        }
      }
      .progress-main {
        position: relative;
        .progress-line {
          position: relative;
          border-radius: 1000px !important;
          background-color: #DFE0E4;
          height: 20px;
          margin-right: 80px;
          i {
            display: block;
            height: 100%;
            border-radius: 1000px !important;
            background: -webkit-linear-gradient(left, #41A7D9, #255FF7);
            background: -moz-linear-gradient(left, #41A7D9, #255FF7);
            background: -ms-linear-gradient(left, #41A7D9, #255FF7);
            background: -o-linear-gradient(left, #41A7D9, #255FF7);
            background: linear-gradient(left, #41A7D9, #255FF7);
          }
        }
        .progress-value {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          text-align: right;
          line-height: 20px;
          color: #255ff7;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
</style>
