/**
 * @file at
 * @author wutong<wutong19@baidu.com>
 */

// 统计光标之前的字符串
function posCursor(obj) {
    const isIE = !(!document.all);
    let end = 0;
    if (isIE) {
        const sTextRange = document.selection.createRange();
        if (sTextRange.parentElement() === obj) {
            const oTextRange = document.body.createTextRange();
            oTextRange.moveToElementText(obj);
            for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end++) {
                oTextRange.moveStart('character', 1);
            }
            for (let i = 0; i <= end; i++) {
                if (obj.value.charAt(i) === '\n') {
                    end++;
                }
            }
        }
    }
    else {
        end = obj.selectionEnd;
    }
    return end;
}

export function stringHandle(textarea, text) {
    let objString = text;
    // 记录光标当前位置
    const cursorPosition = posCursor(textarea);
    // 光标之前的字符串
    const beforeCursorString = objString.substr(0, cursorPosition);
    // 记录@在光表前出现的最近的位置
    const atLocation = beforeCursorString.lastIndexOf('@');
    // 记录光标和光标前最近的@之间的字符串，记为标识符，判断其是否含有空格
    const indexString = objString.substr(atLocation, cursorPosition - atLocation);
    // 记录从开始到光标前最近的@之间的字符串，用来定位
    const positionString = objString.substr(0, atLocation);

    return {
        cursorPosition,
        beforeCursorString,
        indexString,
        positionString
    };
}

export function computedPos(textarea) {
    let isIE = !(document.all) ? 2 : 0;
    const rect = document.getElementById('at').getBoundingClientRect();
    const textRect = textarea.getBoundingClientRect();
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    return {
        left: rect.left - isIE + scrollLeft - textRect.left,
        top: rect.top - isIE + scrollTop - textRect.top
    };
}

export function addString(textarea, pos = posCursor(textarea), text, index, oString) {
    text = text.split('');
    if (Array.isArray(oString)) {
        text.splice(pos, index, ...oString);
    }
    else {
        text.splice(pos, index, oString);
    }
    return text.join('');
}
