/*! https://github.com/yelloxing/debug.console.js
 * Copyright (c) 2019 心叶 
 * @license MIT
 * 2019-12-17 
 */
(function (window, undefined) {

    // 原生的打印方法
    var console = window.console;
    var log = console.log,
        info = console.info,
        debug = console.debug,
        warn = console.warn,
        error = console.error;

    // 当前执行的代码在堆栈中的调用路径
    var trace = console.trace;

    /**
     * 一些前置的工具
     * ----------------------------------------
     */

    // 绑定事件
    var bindEvent = function (target, eventType, callback) {
        if (window.attachEvent)
            target.attachEvent("on" + eventType, callback);
        else
            target.addEventListener(eventType, callback, false);
    }

    /**
     * 日志打印方法
     * ----------------------------------------
     */

    var iframe = document.createElement("iframe");
    iframe.setAttribute('id', 'debug-console-js');
    iframe.style.cssText =
        "display: block;" +
        "position: fixed;" +
        "top: 0px;" +
        "right: 0px;" +
        "z-index: 9999;" +
        "margin: 0px;" +
        "width: 50px;" +
        "height: 50px;" +
        "line-height: 50px;" +
        "text-align: center;" +
        "border: 0px;";
    document.documentElement.appendChild(iframe);
    // 追加的iframe用于显示错误信息
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write("<!DOCTYPE html><html><head><style>" +
        "  .togger-btn{" +
        "    position: fixed;" +
        "    top: 5px;" +
        "    right: 5px;" +
        "    z-index: 9999;" +
        "    background-color: #ff1e8a;" +
        "    margin: 0px;" +
        "    width: 35px;" +
        "    height: 35px;" +
        "    border: 2px dashed #ffffff;" +
        "    border-radius: 50%;" +
        "    line-height: 35px;" +
        "    text-align: center;" +
        "    font-size: 14px;" +
        "    color: white;" +
        "  }" +
        "  .show-list{" +
        "    display:none;" +
        "    padding:10px" +
        "  }" +
        "</style>" +
        "<script>" +
        "  var isHidden=true;" +
        "  function togger(){" +
        "    var iframe=window.parent.document.getElementById('debug-console-js');" +
        "    if(isHidden){" +
        "      document.getElementById('showlist').style.display='block';" +
        "      iframe.style.width='100vw';" +
        "      iframe.style.height='100vh';" +
        "      iframe.style.backgroundColor='#e4e1e1';" +
        "    }else{" +
        "      document.getElementById('showlist').style.display='none';" +
        "      iframe.style.width='50px';" +
        "      iframe.style.height='50px';" +
        "      iframe.style.backgroundColor='';" +
        "    }" +
        "    isHidden=!isHidden;" +
        "  }" +
        "</script>" +
        "</head><body style='margin:0;'>" +
        "  <ul id='showlist' class='show-list'>" +
        "  </ul>" +
        "  <div class='togger-btn' onclick='togger()'>调试</div>" +
        "</body></html>");
    iframeDocument.close();

    var appendInfo = function (text, color) {
        var li = iframeDocument.createElement("li");
        li.style.color = color;
        li.innerText = text;
        iframeDocument.getElementById('showlist').appendChild(li);
    }

    /**
     * 拦截信息
     * ----------------------------------------
     */

    console.log = function (content) {
        log.apply(this, arguments);
        appendInfo("[log]>>>" + content, 'gray');
    };
    console.info = function (content) {
        info.apply(this, arguments);
        appendInfo("[info]>>>" + content, 'green');
    };
    console.debug = function (content) {
        debug.apply(this, arguments);
        appendInfo("[debug]>>>" + content, 'blue');
    };
    console.warn = function (content) {
        warn.apply(this, arguments);
        appendInfo("[warn]>>>" + content, '#f1c010');
    };
    console.error = function (content) {
        error.apply(this, arguments);
        appendInfo("[apply]>>>" + content, 'red');
    };
    console.trace = function (content) {
        trace.apply(this, arguments);
        appendInfo("[trace]>>>" + content, 'white');
    };

    bindEvent(window, 'error', function (content) {
        content = content.message + " " + content.filename + " " + content.lineno + " \nstack :\n" + content.error.stack;
        appendInfo("[catch error]>>>" + content, 'red');
    })

})(window);