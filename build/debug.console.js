/*! git+https://github.com/yelloxing/debug.console.js.git
* Copyright (c) 2019 - 2019 心叶
* @license MIT
* 2019-12-17 
* v0.1.1
*/

"use strict";

(function () {
  'use strict';

  var frameStyle = "\ndisplay: block;\nposition: fixed;\ntop: 0px;\nright: 0px;\nz-index: 9999;\nmargin: 0px;\nwidth: 50px;\nheight: 50px;\nline-height: 50px;\ntext-align: center;\nborder: 0px;\n";

  var frameHTML = "\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    .togger-btn{\n      position: fixed;\n      cursor: pointer;\n      top: 5px;\n      right: 5px;\n      z-index: 9999;\n      background-color: #ff1e8a;\n      margin: 0px;\n      width: 35px;\n      height: 35px;\n      border: 2px dashed #ffffff;\n      border-radius: 50%;\n      line-height: 35px;\n      text-align: center;\n      font-size: 14px;\n      color: white;\n    }\n    .show-list{\n      display:none;\n      padding:10px\n    }\n    .show-list li:not(:first-child){\n      border-top:1px solid white;\n    }\n    .show-list li{\n      padding:7px 0;\n    }\n  </style>\n  <script>\n    var isHidden=true;\n    function togger(){\n      var iframe=window.parent.document.getElementById('debug-console-js');\n      if(isHidden){\n        document.getElementById('showlist').style.display='block';\n        iframe.style.width='100vw';\n        iframe.style.height='100vh';\n        iframe.style.backgroundColor='#e4e1e1';\n      }else{\n        document.getElementById('showlist').style.display='none';\n        iframe.style.width='50px';\n        iframe.style.height='50px';\n        iframe.style.backgroundColor='';\n      }\n      isHidden=!isHidden;\n    }\n  </script>\n</head>\n<body style='margin:0;'>\n  <ul id='showlist' class='show-list'>\n  </ul>\n  <div class='togger-btn' onclick='togger()'>\u8C03\u8BD5</div>\n</body>\n</html>\n";

  // 绑定事件
  function bindEvent(target, eventType, callback) {
    if (window.attachEvent) target.attachEvent("on" + eventType, callback);else target.addEventListener(eventType, callback, false);
  }
  // 获取时间
  function getTime() {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
  // 日志变成字符串
  function toString(contents) {
    var result = "",
        i = void 0;
    for (i = 0; i < contents.length; i++) {
      result += contents[i];
    }
    return result;
  }

  var iframeDocument = void 0,
      console = window.console;

  // 原生的打印方法 + 当前执行的代码在堆栈中的调用路径
  var log = console.log,
      info = console.info,
      debug = console.debug,
      warn = console.warn,
      error = console.error,
      trace = console.trace;

  // 追加日志方法

  var appendInfo = function appendInfo(type, text, color) {
    var li = iframeDocument.createElement("li");
    li.style.color = color;
    li.innerHTML = "\n  <i style='color:gray;font-style:normal;padding-right:10px;'>\n    " + getTime() + "\n  </i>\n  <i style='color:white;font-style:normal;padding:5px;display:inline-block;width:50px;text-align:center;background-color:" + color + ";margin-right:10px;'>\n    " + type + "\n  </i>\n  <div style='padding:10px 0;'>\n    " + text + "\n  </div>\n";
    iframeDocument.getElementById('showlist').appendChild(li);
  };

  /**
   * 开始拦截日志
   * ---------------
   */
  console.log = function () {
    log.apply(this, arguments);
    appendInfo("log", toString(arguments), 'gray');
  };
  console.info = function () {
    info.apply(this, arguments);
    appendInfo("info", toString(arguments), 'green');
  };
  console.debug = function () {
    debug.apply(this, arguments);
    appendInfo("debug", toString(arguments), 'blue');
  };
  console.warn = function () {
    warn.apply(this, arguments);
    appendInfo("warn", toString(arguments), '#f1c010');
  };
  console.error = function () {
    error.apply(this, arguments);
    appendInfo("error", toString(arguments), 'red');
  };
  console.trace = function () {
    trace.apply(this, arguments);
    appendInfo("trace", toString(arguments), 'white');
  };

  var consoleRender = function consoleRender(_iframeDocument) {
    iframeDocument = _iframeDocument;
    bindEvent(window, 'error', function (content) {
      content = content.message + " " + content.filename + " " + content.lineno + " \nstack :\n" + content.error.stack;
      appendInfo("catch ", content, 'red');
    });
  };

  // 追加iframe到页面上去
  // 后期整个调试工具的内容都是在这里面进行，隔绝外部环境，避免对工作代码有不好的影响
  var iframe = document.createElement("iframe");
  iframe.setAttribute('id', 'debug-console-js');
  iframe.style.cssText = frameStyle;
  document.documentElement.appendChild(iframe);
  var iframeDocument$1 = iframe.contentDocument || iframe.contentWindow.document;

  // ifrmae中写入html模板
  iframeDocument$1.open();
  iframeDocument$1.write(frameHTML);
  iframeDocument$1.close();

  // 启动日志拦截
  consoleRender(iframeDocument$1);
})();