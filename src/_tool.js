// 绑定事件
export function bindEvent(target, eventType, callback) {
  if (window.attachEvent)
    target.attachEvent("on" + eventType, callback);
  else
    target.addEventListener(eventType, callback, false);
};

// 获取时间
export function getTime() {
  let date = new Date();
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

// 日志变成字符串
export function toString(contents) {
  let result = "",
    i;
  for (i = 0; i < contents.length; i++) {
    result += contents[i];
  }
  return result;
};