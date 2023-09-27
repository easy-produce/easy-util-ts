
export function getEnvValue<T = any>(key : string) : T {
	// 注意：拿到的都是 string 类型
	// @ts-ignore
	return import.meta.env[key];
}

export const devMode = 'development';
export const prodMode = 'production';

export function getEnvMode() : string {
	return isDevMode() ? devMode : prodMode;
}
export function isDevMode() : boolean {
	return getEnvValue<string>('VITE_DEV') === 'true';
}