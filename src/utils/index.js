/**
 * @file 功能工具
 * @author wangxingzhuo<wangxingzhuo@baidu.com>
 */

import di from './dataInterface';
import {pageAddress} from '@/router';

export function gotoSpaceHome(self, space) {
    if (space.homePageId) {
        self.$router.push(pageAddress(space.homePageId));
        return;
    }
    di.getSpaceInfo(space.spaceId)
    .then(result => {
        self.$router.push(pageAddress(result.homePageId));
    })
    .catch(msg => {
        self.$store.dispatch('error', msg, {root: true});
    });
}
export function htmlUnescape(str) {
    /* eslint-disable */
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    /* eslint-enable */
}
export function computeFileSize(fsize) {
    const size = [
        {
            unit: 'B',
            minNum: 0,
            maxNum: Math.pow(2, 10)
        },
        {
            unit: 'KB',
            minNum: Math.pow(2, 10),
            maxNum: Math.pow(2, 20)
        },
        {
            unit: 'MB',
            minNum: Math.pow(2, 20),
            maxNum: Math.pow(2, 30)
        },
        {
            unit: 'GB',
            minNum: Math.pow(2, 30),
            maxNum: Math.pow(2, 40)
        },
        {
            unit: 'TB',
            minNum: Math.pow(2, 40),
            maxNum: Math.pow(2, 50)
        }
    ];

    for (let i = 0; i < size.length; i++) {
        if (fsize < size[i].maxNum && fsize >= size[i].minNum) {
            return (fsize / size[i].minNum).toFixed(2) + size[i].unit;
        }
    }
}

export function searchResultHightLight(str, keywords) {
    for (let i = 0; i < keywords.length; i++) {
        return str.replace(keywords[i], `<span class="keywords" style="
    color: #ff5661;">${keywords[i]}</span>`);
    }
}

function numberPad(that, fix = 2) {
    return (that / 100).toFixed(fix).split('.')[1];
}

export function dateFormat(that) {
    if (typeof that === 'number') {
        that = new Date(that);
    }
    const year = that.getFullYear();
    const month = that.getMonth() + 1;
    const day = that.getDate();
    const hours = that.getHours();
    const minutes = that.getMinutes();
    const seconds = that.getSeconds();

    return `${year}-${numberPad(month)}-${numberPad(day)}`
    + ` ${numberPad(hours)}:${numberPad(minutes)}:${numberPad(seconds)}`;
}

export function dateUpdate(time) {
    const now = new Date();
    // 时间差，单位秒
    const updateTime = Math.floor((now - time) / 1000);
    // 以当地时间计算，今天已经过完的秒数
    const today = (now.getHours() * 60 + now.getMinutes()) * 60 + now.getSeconds();

    if (updateTime <= 60) {
        return '刚刚';
    }
    if (updateTime < 60 * 60) {
        return `${Math.floor(updateTime / 60) % 60}分钟前`;
    }

    const hours = numberPad(time.getHours());
    const minutes = numberPad(time.getMinutes());

    if (updateTime <= today) {
        return `今天${hours}:${minutes}`;
    }

    const years = time.getFullYear() === now.getFullYear() ? '' : time.getFullYear() + '年';
    const months = numberPad(time.getMonth() + 1);
    const days = numberPad(time.getDate());
    return `${years}${months}月${days}日${hours}:${minutes}`;
}

export default {
    numberPad: numberPad
};
