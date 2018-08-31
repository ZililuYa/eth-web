<template>
  <div class="container">
    <div class="row">
      <!--<div class="col-md-0 col-lg-4 bb255">-->
      <!--<div class="needs-validation">-->
      <!--<h2>提交数据：</h2>-->
      <!--<table class="table ">-->
      <!--<tr v-for="(value, key) in param" :key="key">-->
      <!--<td>{{key}} </td>-->
      <!--<td class="text-right"><span style="color: #337ab7">{{value}}</span></td>-->
      <!--</tr>-->
      <!--</table>-->
      <!--</div>-->
      <!--</div>-->
      <div class="col-md-12 col-lg-12 bb255">
        <form class="needs-validation" v-show="loading" onsubmit="return false" novalidate>
          <h2 class="text-center" v-show="!param.id">创建ICO项目</h2>
          <h2 class="text-center" v-show="param.id">编辑 {{param.name}} 项目</h2>
          <div class="form-group">
            <h5>名称：</h5>
            <input type="text" v-model="param.name" class="form-control form-control-lg" placeholder="name 名称" required>
            <div class="invalid-tooltip">
              请输入name
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>代币地址：</h5>
            <input type="text" v-model="param.address" placeholder="address 代币地址" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入address
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <!--<textarea type="text" v-model="param.content" placeholder="content 基本介绍" class="form-control form-control-lg" required></textarea>-->
            <h5>基本介绍：</h5>
            <div class="quill-editor" placeholder="content 基本介绍"
                 :content="param.content"
                 @change="onEditorChange($event)"
                 v-quill:myQuillEditor="editorOption">
            </div>
            <div class="invalid-tooltip">
              请输入 content
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>专家评分：</h5>
            <input type="text" v-model="param.expertRate" placeholder="expertRate 专家评分" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 expertRate
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>费率：</h5>
            <input type="text" v-model="param.fee" placeholder="fee 费率" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 fee
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>软顶：</h5>
            <input type="text" v-model="param.softCap" placeholder="softCap 软顶" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 softCap
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>硬顶：</h5>
            <input type="text" v-model="param.hardCap" placeholder="hardCap 硬顶" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 hardCap
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>项目说明图：</h5>
            <input type="text" v-model="param.imageurlBig" placeholder="imageurlBig 项目说明图" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 imageurlBig
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>项目图标：</h5>
            <input type="text" v-model="param.imageurlSmall" placeholder="imageurlSmall 项目图标" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 imageurlSmall
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>横幅图片：</h5>
            <input type="text" v-model="param.ownerImageurl" placeholder="ownerImageurl 发布者logo" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 ownerImageurl
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>发布者名称：</h5>
            <input type="text" v-model="param.ownerName" placeholder="ownerName 发布者名称" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 ownerName
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>参考价：</h5>
            <input type="text" v-model="param.price" placeholder="price 参考价" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 price
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>额度：</h5>
            <input type="text" v-model="param.quota" placeholder="quota 额度" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 quota
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>项目说明：</h5>
            <textarea type="text" v-model="param.saleContent" placeholder="saleContent 项目说明" class="form-control form-control-lg" required></textarea>
            <div class="invalid-tooltip">
              请输入 saleContent
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>开始时间：</h5>
            <!--<input type="text" v-model="param.startTime" placeholder="startTime 开始时间" class="form-control form-control-lg" required>-->
            <flat-pickr
              v-model="param.startTime"
              placeholder="开始时间"
              :config="config"
              class="form-control form-control-lg">
            </flat-pickr>
            <div class="invalid-tooltip">
              请输入 startTime
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>结束时间：</h5>
            <!--<input type="text" v-model="param.endTime" placeholder="endTime 结束时间" class="form-control form-control-lg" required>-->
            <flat-pickr
              v-model="param.endTime"
              placeholder="结束时间"
              :config="config"
              class="form-control form-control-lg">
            </flat-pickr>
            <div class="invalid-tooltip">
              请输入 endTime
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>项目简介：</h5>
            <textarea type="text" v-model="param.summary" placeholder="summary 项目简介" class="form-control form-control-lg" required></textarea>
            <div class="invalid-tooltip">
              请输入 summary
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>代码：</h5>
            <input type="text" v-model="param.symbol" placeholder="symbol 代码" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 symbol
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>团队地址：</h5>
            <input type="text" v-model="param.teamurl" placeholder="teamurl 团队地址" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 teamurl
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>介绍视频：</h5>
            <input type="text" v-model="param.videourl" placeholder="videourl 介绍视频" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 videourl
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>官网：</h5>
            <input type="text" v-model="param.weburl" placeholder="weburl 官网" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 weburl
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>白皮书地址：</h5>
            <input type="text" v-model="param.whitepaperurl" placeholder="whitepaperurl 白皮书地址" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 whitepaperurl
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>
          <div class="form-group">
            <h5>真实比例：</h5>
            <input type="text" v-model="param.ratio" placeholder="ratio 真实比例" class="form-control form-control-lg" required>
            <div class="invalid-tooltip">
              请输入 ratio
            </div>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>

          <div class="form-group">
            <h5>状态：</h5>
            <select v-model="param.active" class="form-control form-control-lg">
              <option :value="0">不展示</option>
              <option :value="1">进行中</option>
              <option :value="2">结束</option>
            </select>
            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
          </div>


          <button type="submit" class="btn btn-primary btn-block" :disabled="disabled"><i class="fa fa-circle-o-notch fa-spin" v-show="disabled"></i> {{reg_text}}</button>
        </form>
        <div class="text-center" v-show="!loading"><i class="fa fa-spinner fa-spin"></i> 加载中</div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import ajax from '~/assets/js/ajax.js'
  import axios from 'axios'

  import { Mandarin } from 'flatpickr/dist/l10n/zh';

  export default {
    data () {
      return {
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'Y-m-d',
          altInput: true,
          dateFormat: 'U',
          locale: Mandarin, // locale for this instance only
        },
        loading: false,
        editorOption: {
          placeholder: '项目基本介绍'
        },
        disabled: false,
        reg_text: '创建项目',
        param: {
          ratio: '',
          active: 1,
          address: '',
          content: '',
          expertRate: '',
          fee: '',
          hardCap: '',
          imageurlBig: '',
          imageurlSmall: '',
          name: '',
          ownerImageurl: '',
          ownerName: '',
          price: '',
          quota: '',
          saleContent: '',
          softCap: '',
          startTime: new Date().getTime(),
          endTime: (new Date().getTime() + (1000 * 60 * 60 * 24 * 30)),
          summary: '',
          symbol: '',
          teamurl: '',
          videourl: '',
          weburl: '',
          whitepaperurl: ''
        }
      }
    },
    methods: {
      onEditorChange ({editor, html, text}) {
//        console.log('editor change!', editor, html, text)
        this.param.content = html
      },
      submit () {
        this.param.expertRate = parseFloat(this.param.expertRate)
        this.param.fee = parseFloat(this.param.fee)
        this.param.quota = parseFloat(this.param.quota)
        this.param.ratio = parseFloat(this.param.ratio)
//        this.param.hardCap = parseFloat(this.param.hardCap)
//        this.param.softCap = parseFloat(this.param.softCap)
//        this.param.price = parseFloat(this.param.price)
        let params = {
          url: this.param.id ? '/project/update' : '/project/create',
          method: 'POST',
          data: this.param
        }
        let callback = (data) => {
          console.log(data)

          this.$Alert.message({
            text: '操作成功'
          })
          setTimeout(() => this.$router.push('/panel/project'), 2000)
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
          this.reg_text = '正在操作，请稍后'
        } else {
          this.disabled = false
          this.reg_text = '创建项目'
        }
      },
      init (id) {
        if (!id) {
          this.loading = true
          return false
        }
        let params = {
          url: '/project/details',
          method: 'POST',
          data: {id}
        }
        let callback = (data) => {
          data.data.startTime = data.data.startTime * 1000
          data.data.endTime = data.data.endTime * 1000
          this.param = data.data
          this.loading = true
          this.reg_text = '修改项目'
        }
        let error = (data) => {
          this.$Alert.message({
            text: data.msg
          });
//          location.href = '/'
        }
        this.$axios.ajax(params, callback, error, error)
      }
    },
    mounted () {
      this.init(this.$route.query.id)
//      ajax.post(123)
//      ajax('123')
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      let vm = this
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          console.log(form)
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            vm.btn_start(1)
            vm.submit()
          }
          form.classList.add('was-validated');
          return false
        }, false);
      });
    }
  }
</script>

<style>
  .bb255 {
    background-color: #ffffff;
    overflow: hidden;
  }
</style>
