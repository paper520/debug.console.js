
window._yelloxing_debugger_eventarray_ = {};

/**
 * 使用方式:
 * this.on(eventType, callback);    注册事件
 * this.trigger(eventType, data);   触发事件
 * 
 * 全局通信工具
 * 
 * @author 心叶(yelloxing)
 * 
 * 2020年8月18日于南京
 */

export default {
    install(iCrush) {

        iCrush.prototype.on = (eventType, callback) => {
            window._yelloxing_debugger_eventarray_[eventType] = window._yelloxing_debugger_eventarray_[eventType] || [];
            window._yelloxing_debugger_eventarray_[eventType].push(callback);
        };

        iCrush.prototype.trigger = (eventType, data) => {

            window._yelloxing_debugger_eventarray_[eventType] = window._yelloxing_debugger_eventarray_[eventType] || [];

            for (let index = 0; index < window._yelloxing_debugger_eventarray_[eventType].length; index++) {
                window._yelloxing_debugger_eventarray_[eventType][index](data);
            }
            
        };

    }
};