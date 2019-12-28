
export function numberPad(that: number, fix = 2): string {
  return (that / 100).toFixed(fix).split('.')[1];
}

export function dateFormat(that: number | Date): string {
  if (!that) return '';
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
