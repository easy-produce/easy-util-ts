import Big from 'big.js';

// 参数容错处理
function faultTolerance(x) {
  x = x ?? 0

  if (Number.isNaN(x)) {
    x = 0;
  }

  return x;
}

/**
 * 数学运算： 加法
 * 解决浮点数问题
 * @param {*} x
 * @param {*} y
 * @param {*} n
 * @example
 * plus(0.1, 0.2, 0.3) // 0.6
 */
export function plus(x = 0, y = 0, ...n) {
  x = faultTolerance(x);
  y = faultTolerance(y);
  if (n.length) { return plus(Big(x).plus(y), ...n); }
  return Big(x).plus(y) * 1;
}

/**
 * 数学运算： 减法
 * 解决浮点数问题
 * @param {*} x
 * @param {*} y
 * @param {*} n
 * @example
 * minus(0.4, 0.2, 0.1) // 0.1
 */
export function minus(x = 0, y = 0, ...n) {
  x = faultTolerance(x);
  y = faultTolerance(y);
  if (n.length) { return minus(Big(x).minus(y), ...n); }
  return Big(x).minus(y) * 1;
}

/**
 * 数学运算： 乘法
 * 解决浮点数问题
 * @param {*} x
 * @param {*} y
 * @param {*} n
 * @example
 * times(0.1, 0.2, 0.3) // 0.006
 */
export function times(x = 0, y = 0, ...n) {
  x = faultTolerance(x);
  y = faultTolerance(y);
  if (n.length) { return times(Big(x).times(y), ...n); }
  return Big(x).times(y) * 1;
}

export function toFixed(n, p) {
  return Big(n).toFixed(p) * 1;
}

/**
 * 数学运算： 除法
 * 解决浮点数问题
 * @param {*} x
 * @param {*} y
 * @param {*} n
 * @example
 * div(0.06, 0.2, 0.3) // 1
 */
 export function div(x = 0, y = 0, ...n) {
  if (n.length) { return div(Big(x).div(y), ...n); }
  return Number(Big(x).div(y));
}
/**
 * 数学运算： 取余
 * 解决浮点数问题
 * @param {*} x
 * @param {*} y
 * @param {*} n
 * @example
 * div(0.06, 0.2, 0.3) // 1
 */
 export function mod(x = 0, y = 0, ...n) {
  if (n.length) { return mod(Big(x).mod(y), ...n); }
  return Number(Big(x).mod(y));
}



export default {
  plus,
  minus,
  times,
  toFixed,
  div,
};
