<template>
  <div class="container quota-main">
    <div class="row ">
      <div class="col-lg-12">
        <div class="card quota">
          <div class="row mb">
            <div class="col-lg-4">账户余额：30.00 ETH</div>
            <div class="input-group input-group-sm col-lg-4">
              <select class="form-control">
                <option>- 请选择代币 -</option>
                <option>EOS</option>
                <option>ESS</option>
                <option>BTC</option>
              </select>
            </div>
            <div class="input-group input-group-sm col-lg-4">
              <input type="text" class="form-control" placeholder="请输入关键字">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">搜索</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-hover ">
            <thead>
            <tr>
              <th scope="col">代币</th>
              <th scope="col">额度</th>
              <th scope="col">售价</th>
              <th scope="col">出售人</th>
              <th scope="col" width="1">#</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in [1,2,3,4,5,6,7,8,9,10]" :key="i">
              <td><img class="media-object" src="https://image.ibb.co/idWJ9S/essentia_small.png"> ESS</td>
              <td>{{i}}</td>
              <td>{{i * 1.5}} ETH</td>
              <td>Snake</td>
              <td>
                <button class="btn btn-sm btn-primary" @click="buy">购买</button>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="text-center">
            <nav aria-label="...">
              <ul class="pagination pagination-sm">
                <li class="page-item"><a class="page-link" href="#">上一页</a></li>
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">下一页</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {}
    },
    methods: {
      buy () {
        this.$Alert.modal({
          prompt: "确认购买吗？"
        });
      },
    },
    mounted () {
    },
    create () {
    },
  }
</script>

<style lang="less">
  .quota-main {
    .card.quota {
      padding: 15px;
    }

    .quota td {
      vertical-align: middle;
    }

    .quota table {
      font-size: 13px;
    }

    .mb {
      margin-bottom: 15px;
      font-size: 13px;
    }

    .media-object {
      height: 30px;
      width: 30px;
      vertical-align: middle;
    }
  }
</style>
