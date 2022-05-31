export function durationTrans(a: any) {
  var b = ""
  var h: number | string = parseInt((a / 3600).toString()),
    m: number | string = parseInt((a % 3600 / 60).toString()),
    s: number | string = parseInt((a % 3600 % 60).toString());
  if (h > 0) {
    h = h < 10 ? '0' + h : h
    b += h + ":"
  }
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  b += m + ":" + s
  return b;
}