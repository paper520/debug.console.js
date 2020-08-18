// 判断变量是不是json
function isJson(variable) {
    return (
        typeof variable === "object" &&
        Object.prototype.toString.call(variable).toLowerCase() ==
        "[object object]" &&
        !variable.length
    );
}

import isElement from '@yelloxing/core.js/isElement';
import isString from '@yelloxing/core.js/isString';

// 日志变成字符串
export default function (contents) {
    let result = "",
        i;
    for (i = 0; i < contents.length; i++) {
        let text = contents[i];

        // 如果是json
        if (isJson(text)) {
            text = "JSON:" + JSON.stringify(text).replace(/</g, '&lt;').replace(/</g, '&gt;');
        }

        // 如果是结点
        else if (isElement(text)) {
            text = "HtmlNode:" + text.outerHTML.replace(/</g, '&lt;').replace(/</g, '&gt;');
        }

        // 如果是结点集合
        else if (text.constructor == HTMLCollection || text.constructor == NodeList) {
            let temp = [];
            for (let i = 0; i < text.length; i++) {
                temp.push("&nbsp;[" + i + "]" + text[i].outerHTML.replace(/</g, '&lt;').replace(/</g, '&gt;'));
            }
            text = "HtmlNodes:[<br />" + temp.join(",<br />") + "<br />]";
        }

        // 如果是字符串
        else if (isString(text)) {
            text = text.replace(/</g, '&lt;').replace(/</g, '&gt;');
        }

        result += text;
    }
    return result;
};