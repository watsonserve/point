
export function htmlUnescape(str) {
  return str
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');
}

export function computeFileSize(rcx) {
  const size = ['B', 'KB', 'MB', 'GB', 'TB'];
  let rax, rbx = 1;
  const rdx = rcx;

  // 计算数量级
  for (rax = 0; rax < size.length && 1023 < rcx; rcx = Math.floor(rcx / 1024), rbx *= 1024, rax++);
  // 得到显示的浮点数
  let [r8, r9] = (rdx / rbx).toFixed(3).split('.');
  for (rcx = r9.length - 1; 0 <= rcx && r9[rcx] === '0'; rcx--);
  r9 = rcx < 0 ? '' : `.${r9.substr(0, rcx + 1)}`;
  return `${r8}${r9}${size[rax]}`;
}

export function searchResultHightLight(str, keywords) {
    for (let i = 0; i < keywords.length; i++) {
        return str.replace(keywords[i], `<span class="keywords" style="
    color: #ff5661;">${keywords[i]}</span>`);
    }
}

export function numberPad(that, fix = 2) {
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
