import iCrush from 'icrush';

let doit = function (el, binding) {
    if (binding.value == binding.type) {
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

/**
 * 控制是否不隐藏
 * --------------------------
 * ui-show:value='flag' 
 * 如果flag!=value就隐藏
 * 
 * @author yelloxing
 * @date 2020年8月18日
 */

iCrush.directive('uiShow', {
    inserted: doit,
    update: doit
});