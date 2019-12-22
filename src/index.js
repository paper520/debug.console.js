import frameStyle from './frameStyle';
import frameHTML from './frameHTML';
import consoleRender from './console';

// 追加iframe到页面上去
// 后期整个调试工具的内容都是在这里面进行，隔绝外部环境，避免对工作代码有不好的影响
let iframe = document.createElement("iframe");
iframe.setAttribute('id', 'debug-console-js');
iframe.style.cssText = frameStyle;
document.documentElement.appendChild(iframe);
let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

// ifrmae中写入html模板
iframeDocument.open();
iframeDocument.write(frameHTML);
iframeDocument.close();

// 启动日志拦截
consoleRender(iframeDocument);