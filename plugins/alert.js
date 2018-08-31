import Vue from 'vue'

let createM = function (options) {
  let str = '<div class="mask"></div>' +
    '<div class="elasticBox">';
  if( options ){
    if (options.title) {
      str += `<div class='title'><span>${options.title}</span></div>`;
    }
    if (options.close) {
      str += `<div class="close"></div>`
    }
    if (options.prompt) {
      str += `<div class='prompt'>${options.prompt}</div>`;
    }
    if (options.cancel || options.jump) {
      if (options.cancel && options.jump) {
        str += "<div class='affair1'>";
      } else {
        str += "<div class='affair'>";
      }

      if (options.cancel) {
        str += `<div class='cancel'>${options.cancel}</div>`;
      }
      if (options.jump) {
        str += `<div class='jump'>${options.jump}</div>`;
      }
      str += "</div>";
    }
  }
  str += "</div>";
  return str;
};
let modal = function (option) {
  let options = {
    jump: option.jump ? option.jump : '确定',
    title: option.title ? option.title : '系统提示',
    close: option.close ? option.close : true,
    cancel: option.cancel ? option.cancel : '取消',
    width: option.width ? option.width : '',
    prompt: option.prompt ? option.prompt : '',
    jumpFn: option.jumpFn ? option.jumpFn : function () {},
    closelFn: option.closelFn ? option.closelFn : function () {},
    cancelFn: option.cancelFn ? option.cancelFn : function () {},
    maskClose: option.maskClose ? option.maskClose : true
  };
//  默认配置
  let elastic, body = document.getElementsByTagName('body')[0];
  body.className += 'overflow';
  if(document.getElementsByClassName('elastic').length === 0 ) {
    elastic = document.createElement('div');
    elastic.className = 'elastic';
    elastic.style.width = options.width;
    elastic.innerHTML = createM(options);
    body.appendChild(elastic);
    elastic.className += ' show';
    setTimeout(() => {
      elastic.className += ' elastic1';
    },30)

  }else {
    elastic = document.getElementsByClassName('elastic')[0];
    elastic.innerHTML = createM(options);
    elastic.style.width = options.width;
    elastic.className = 'elastic show';
    setTimeout(() => {
      elastic.className += ' elastic1';
    },30)
  }
  elastic.onclick = null;
  //清空原事件,
  elastic.onclick = function (e) {
    switch (e.target.className) {
      case 'mask':
        elastic.className = 'elastic hidden';
        options.cancelFn && options.cancelFn();
        body.className = body.className.replace(/overflow/g, '');
        break;
      case 'close':
        options.cancelFn && options.closelFn();
        elastic.className = 'elastic hidden';
        body.className = body.className.replace(/overflow/g, '');
        break;
      case 'cancel':
        options.cancelFn && options.cancelFn();
        elastic.className = 'elastic hidden';
        body.className = body.className.replace(/overflow/g, '');
        break;
      case 'jump':
        options.jumpFn && options.jumpFn();
        elastic.className = 'elastic hidden';
        body.className = body.className.replace(/overflow/g, '');
        break;
    }
  }
};
let createMe = function (options) {
  console.log(options)
  let  str = `<div class="shootAuto"><div class="${options.iconClass}"></div><span>${options.text}</span>`;
  if (options.close) {
    str += `<div class="close"></div>`;
  }
  str += "</div>";
  return str;
};
let message = function (option) {
  let options = {
    text: option.text ? option.text : '这是一个提示',
    close: option.close ? option.close : '',
    time: (option.time && Number(option.time)) ? option.time : 3000,
    iconClass: option.iconClass ? option.iconClass : 'success',
  };
  let shootBox, body = document.getElementsByTagName('body')[0];
  if (document.getElementsByClassName('shoot').length === 0 ) {
    //未添加过
    shootBox = document.createElement('div');
    shootBox.className = 'shoot';
    shootBox.innerHTML = createMe(options);
    body.appendChild(shootBox);
    shootBox.className += ' show';
    setTimeout(() => {
      shootBox.className = 'shoot hidden';
    },options.time)
  } else {
    //已存在
    shootBox = document.getElementsByClassName('shoot')[0];
    shootBox.innerHTML = createMe(options);
    shootBox.className = 'shoot show';
    setTimeout(() => {
      shootBox.className = 'shoot hidden';
    },options.time);
  }
  shootBox.onclick = null;
  // 清空原事件,
  shootBox.onclick = function (e) {
    if (e.target.className === 'close') {
        shootBox.className = 'shoot hidden';
    }
  }

};
let Alert = {
  modal: modal,
  message: message
};

Vue.prototype.$Alert = Alert;

