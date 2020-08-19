import iCrush from 'icrush';

let doit = function (el, binding) {
    if (binding.value) {
        el.style.display = 'none';
    } else {
        el.style.display = '';
    }
}

/**
 * 控制是否隐藏
 * --------------------------
 * ui-hidden='flag' 
 * 如果flag=true就隐藏
 * 
 * @author yelloxing
 * @date 2020年8月18日
 */

iCrush.directive('uiHidden', {
    inserted: doit,
    update: doit
});