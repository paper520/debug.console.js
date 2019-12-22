import { bindEvent, getTime, toString } from './_tool';

let iframeDocument, console = window.console;

// 原生的打印方法 + 当前执行的代码在堆栈中的调用路径
const { log, info, debug, warn, error, trace } = console;

// 追加日志方法
let appendInfo = function (type, text, color) {
  let li = iframeDocument.createElement("li");
  li.style.color = color;
  li.innerHTML = `
  <i style='color:gray;font-style:normal;padding-right:10px;'>
    ${getTime()}
  </i>
  <i style='color:white;font-style:normal;padding:5px;display:inline-block;width:50px;text-align:center;background-color:${color};margin-right:10px;'>
    ${type}
  </i>
  <div style='padding:10px 0;'>
    ${text}
  </div>
`;
  iframeDocument.getElementById('showlist').appendChild(li);
}

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

export default (_iframeDocument) => {
  iframeDocument = _iframeDocument
  bindEvent(window, 'error', function (content) {
    content = content.message + " " + content.filename + " " + content.lineno + " \nstack :\n" + content.error.stack;
    appendInfo("catch ", content, 'red');
  });
};