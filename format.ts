import { LOCALENUM_KEY } from '@/lib/enum/cachekey'
import { get, isNil, isNumber, isNaN, isArray, isObject } from 'lodash';
<<<<<<< HEAD
import * as math from '@easyproduce/easy-util-ts/math';
=======
import * as math from './math';
>>>>>>> 8f2fb58d95202fde4681aa6c6eda7c8485e6e3bc
import dayjs from 'dayjs'
import enumfile from '@/lib/enum/enum';
/**
 * 获取枚举
 * @param {String} formName 表单名称
 */
// export const getEnums: any = (key: any, isLocal: boolean | undefined) => {
//   let appEnums = uni.getStorageSync('LOCALENUM_KEY')
//   let keys = Object.keys((appEnums as any)[key] || {});
//   if (isLocal) {
//     let obj = (ConstEnum as any)[key] || {};
//     keys = Object.keys(obj);
//     return keys.map((item: any) => ({
//       value: item,
//       id: obj[item],
//       label: obj[item],

//     }));
//   }

//   return keys.map((item: any) => ({
//     value: item,
//     id: item.id || (appEnums as any)[key][item],
//     label: (appEnums as any)[key][item],

//   }));
// };
export const getEnumMap = () => {
	const _enum: any = {};
	return function fn(currentMap: any, parentKey = '') {
		if (currentMap._data) {
			_enum[parentKey] = {
				...currentMap._data,
			};
		} else {
			isObject(currentMap) && Object.keys(currentMap).forEach((key: any) => {
				const nextMap = currentMap[key as keyof typeof currentMap];
				const _key = parentKey ? `${parentKey}_${key}` : key;
				fn(nextMap, _key);
			});
		}
		return _enum;
	};
};


export const enums = (str: string, fromNet?: boolean) => {
	if (fromNet) {
		const appEnums = uni.getStorageSync(LOCALENUM_KEY)
		return get(appEnums, str, '');
	} else {
		const appEnums = enumfile;
		return get(appEnums, str, '');
	}

};


/**
 * 如果为空、null、undefined 则用---占位
 * @param val 参数
 */
export function placeholder(val: any) {
	if (isNil(val) || isNaN(val) || val === '') {
		return '-';
	}
	return val;
}

/**
 * 格式化金额
 * @param  {[type]} v     [要转换的数字]
 * @param  {[type]} len   [小数点位数,默认2位]
 * @param  {[type]} split [分隔符,默认',']
 * @return {[type]}       [返回转换完的字符串]
 */
export function fmoney(v: number | string, len: number, split = ',') {
	if (!isNumber(v)) { return ''; }
	len = Math.abs(+len % 20 || 2);
	v = parseFloat((v + '').replace(/[^\d .-]/g, '')).toFixed(len) + '';
	return v.replace(/\d+/, (rv: string) => {
		const lit = rv.length % 3 === 0;
		const index = lit ? rv.length - 3 : -1;
		return rv
			.split('')
			.reverse()
			.join('')
			.replace(/\d{3}/g, (k: any, l: any) => {
				return k + (l === index && lit ? '' : split);
			})
			.split('')
			.reverse()
			.join('');
	});
}
export function yangMoney(v: number | string, len: number, split: string = ',') { return isNumber(v) && !isNaN(v) ? `¥${fmoney(v, len, split)}` : '' }

/**
 *
 * @param v 数值(小数位大于6位不做四舍五入, 直接截取到小数位6位)
 * @param defaultOption split格式化分隔符、 prefix前缀、decimalMaxLength最大小数显示位、decimalMinLength最大小数显示位
 * @returns
 */
function fnumberOld(v: number, defaultOption = {}) {
	const option = {
		split: ',',
		prefix: '',
		decimalMaxLength: 6,
		decimalMinLength: 2,
		formatType: 0, // 0 四舍五入 1 按位截断
		...defaultOption,
	};
	const reg = /\.0+$/;

	const value = (typeof v === 'string' && isNumber(v * 1)) || (isNumber(v) && !isNaN(v)) ? v : 0;
	const symbol = value * 1 < 0 ? '-' : '';

	let int = '';
	let decimal = '';

	if (option.formatType === 0) {    // 四舍五入截断方式显示，小数位大于decimalMaxLength则截断
		const toFixedNumberStr: any = math.toFixed(value * 1, option.decimalMaxLength);
		const tempArr = String(toFixedNumberStr).replace(reg, '').split('.');
		const innerInt = tempArr[0];
		const innerDecimal = tempArr[1] ? tempArr[1].substr(0, option.decimalMaxLength).replace(reg, '') : '';
		int = innerInt;
		decimal = innerDecimal;
	} else {
		// 按长度省略截取方式显示，小数位大于decimalMaxLength则截断
		const tempArr = String(value).split('.');
		const innerInt = tempArr[0];
		const innerDecimal = tempArr[1] ? tempArr[1].substr(0, option.decimalMaxLength).replace(reg, '') : '';
		int = innerInt;
		decimal = innerDecimal;
	}

	// const symbol = (int as any) < 0 ? '-' : '';

	const intStr = Math.abs(int as any)
		.toString()
		.split('')
		// 正向添加分割号
		.reverse()
		.join('')
		.replace(/(\d{3})/g, `$1${option.split}`)
		.replace(new RegExp(`^${option.split}|${option.split}$`), '')
		.split('')
		.reverse()
		.join('') || '0';
	const resultDecimal = decimal.padEnd(option.decimalMinLength, '0');
	const resultInt = resultDecimal ? `${intStr}.${resultDecimal}` : intStr;
	return `${option.prefix}${symbol}${resultInt}`;
}

export function fnumber(num: number, minlen = 2, maxlen = 6, options = {}){
	return fnumberOld(num, { decimalMinLength: minlen, decimalMaxLength: maxlen, ...options });
}

/**
 * 日期字符串格式化
 *
 * @export
 * @param {string} [date=''] 需要被格式化的字符串
 * @param {string} [pattern=process.env.process.env.DATE_PATTERN] 格式 详见参考 http://dayjsjs.cn/
 * @returns 格式化后的日期字符串
 */
export function formatDate(
	date: string = '',
	pattern: string = 'YYYY-MM-DD',
) {
	if (!date) {
		return '';
	}
	return dayjs(date).format(pattern);
}