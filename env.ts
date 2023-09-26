import pkg from '../../package.json';

export function getEnvValue<T = any>(key : string) : T {
	// 注意：拿到的都是 string 类型
	// @ts-ignore
	return import.meta.env[key];
}
export function getPkgVersion() {
	return `${`__${pkg.version}`}__`.toUpperCase();
}
export const devMode = 'development';
export const prodMode = 'production';

export function getEnvMode() : string {
	return isDevMode() ? devMode : prodMode;
}
export function isDevMode() : boolean {
	return getEnvValue<string>('VITE_DEV') === 'true';
}