/*! git+https://github.com/yelloxing/debug.console.js.git
* Copyright (c) 2019 - 2020 心叶
* @license MIT
* 2019-12-17 
* v0.1.5
*/

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var frameStyle = "\ndisplay: block;\nposition: fixed;\ntop: 0px;\nright: 0px;\nz-index: 9999;\nmargin: 0px;\nwidth: 50px;\nheight: 50px;\nline-height: 50px;\ntext-align: center;\nborder: 0px;\n";
  var frameHTML = "\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    .togger-btn{\n      position: fixed;\n      cursor: pointer;\n      top: 5px;\n      right: 5px;\n      z-index: 9999;\n      background-color: #ff1e8a;\n      margin: 0px;\n      width: 35px;\n      height: 35px;\n      border: 2px dashed #ffffff;\n      border-radius: 50%;\n      line-height: 35px;\n      text-align: center;\n      font-size: 14px;\n      color: white;\n    }\n    .show-list{\n      display:none;\n      padding:10px\n    }\n    .show-list li:not(:first-child){\n      border-bottom:1px solid white;\n    }\n    .show-list li{\n      padding:7px 0;\n    }\n  </style>\n  <script>\n    var isHidden=true;\n    function togger(){\n      var iframe=window.parent.document.getElementById('debug-console-js');\n      if(isHidden){\n        document.getElementById('showlist').style.display='block';\n        iframe.style.width='100vw';\n        iframe.style.height='100vh';\n        iframe.style.backgroundColor='#e4e1e1';\n      }else{\n        document.getElementById('showlist').style.display='none';\n        iframe.style.width='50px';\n        iframe.style.height='50px';\n        iframe.style.backgroundColor='';\n      }\n      isHidden=!isHidden;\n    }\n  </script>\n</head>\n<body style='margin:0;'>\n  <ul id='showlist' class='show-list'>\n    <li><a target=\"_blank\" href='https://github.com/yelloxing/debug.console.js/issues'>\u4F7F\u7528\u7684\u65F6\u5019\uFF0C\u6709\u7591\u95EE\u6216\u60F3\u6CD5\uFF0C\u70B9\u51FB\u6B64\u5904\u544A\u77E5\u6211\u4EEC(\u5305\u62EC\u95EE\u9898\u7B49)\uFF01</a></li>\n  </ul>\n  <div class='togger-btn' onclick='togger()'>\u8C03\u8BD5</div>\n</body>\n</html>\n";
  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }
  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  } // 绑定事件


  function bindEvent(target, eventType, callback) {
    if (window.attachEvent) target.attachEvent("on" + eventType, callback);else target.addEventListener(eventType, callback, false);
  } // 获取时间


  function getTime() {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  } // 判断变量是不是json


  function isJson(variable) {
    return _typeof(variable) === "object" && Object.prototype.toString.call(variable).toLowerCase() == "[object object]" && !variable.length;
  } // 日志变成字符串


  function toString$1(contents) {
    var result = "",
        i;

    for (i = 0; i < contents.length; i++) {
      var text = contents[i]; // 如果是json

      if (isJson(text)) {
        text = "JSON:" + JSON.stringify(text).replace(/</g, '&lt;').replace(/</g, '&gt;');
      } // 如果是结点
      else if (isElement(text)) {
          text = "HtmlNode:" + text.outerHTML.replace(/</g, '&lt;').replace(/</g, '&gt;');
        } // 如果是结点集合
        else if (text.constructor == HTMLCollection || text.constructor == NodeList) {
            var temp = [];

            for (var _i = 0; _i < text.length; _i++) {
              temp.push("&nbsp;[" + _i + "]" + text[_i].outerHTML.replace(/</g, '&lt;').replace(/</g, '&gt;'));
            }

            text = "HtmlNodes:[<br />" + temp.join(",<br />") + "<br />]";
          } // 如果是字符串
          else if (isString(text)) {
              text = text.replace(/</g, '&lt;').replace(/</g, '&gt;');
            }

      result += text;
    }

    return result;
  }

  var iframeDocument,
      console = window.console; // 原生的打印方法 + 当前执行的代码在堆栈中的调用路径

  var log = console.log,
      info = console.info,
      debug = console.debug,
      warn = console.warn,
      error = console.error,
      trace = console.trace; // 追加日志方法

  var appendInfo = function appendInfo(type, text, color) {
    var li = iframeDocument.createElement("li");
    li.style.color = color;
    li.innerHTML = "\n  <i style='color:gray;font-style:normal;padding-right:10px;width:70px;display:inline-block;'>\n    ".concat(getTime(), "\n  </i>\n  <i style='color:white;font-style:normal;padding:5px;display:inline-block;width:50px;text-align:center;background-color:").concat(color, ";margin-right:10px;'>\n    ").concat(type, "\n  </i>\n  <div style='padding:10px 0;'>\n    ").concat(text, "\n  </div>\n");
    iframeDocument.getElementById('showlist').appendChild(li);
  };
  /**
   * 开始拦截日志
   * ---------------
   */


  console.log = function () {
    log.apply(this, arguments);
    appendInfo("log", toString$1(arguments), 'gray');
  };

  console.info = function () {
    info.apply(this, arguments);
    appendInfo("info", toString$1(arguments), 'green');
  };

  console.debug = function () {
    debug.apply(this, arguments);
    appendInfo("debug", toString$1(arguments), 'blue');
  };

  console.warn = function () {
    warn.apply(this, arguments);
    appendInfo("warn", toString$1(arguments), '#f1c010');
  };

  console.error = function () {
    error.apply(this, arguments);
    appendInfo("error", toString$1(arguments), 'red');
  };

  console.trace = function () {
    trace.apply(this, arguments);
    appendInfo("trace", toString$1(arguments), 'white');
  };

  var consoleRender = function consoleRender(_iframeDocument) {
    iframeDocument = _iframeDocument;
    bindEvent(window, 'error', function (content) {
      content = content.message + " " + content.filename + " " + content.lineno + " \nstack :\n" + content.error.stack;
      appendInfo("catch ", content, 'red');
    });
  }; // 追加iframe到页面上去
  // 后期整个调试工具的内容都是在这里面进行，隔绝外部环境，避免对工作代码有不好的影响


  var iframe = document.createElement("iframe");
  iframe.setAttribute('id', 'debug-console-js');
  iframe.style.cssText = frameStyle;
  document.documentElement.appendChild(iframe);
  var iframeDocument$1 = iframe.contentDocument || iframe.contentWindow.document; // ifrmae中写入html模板

  iframeDocument$1.open();
  iframeDocument$1.write(frameHTML);
  iframeDocument$1.close(); // 启动日志拦截

  consoleRender(iframeDocument$1);
})();