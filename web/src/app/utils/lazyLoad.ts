import { lazy } from 'react'

export const lazyLoad = <T extends Record<string, any>, U extends keyof T>(
	loader: (x?: string) => Promise<T>,
) =>
	new Proxy({} as unknown as T, {
		get: (_, componentName: string | symbol) => {
			if (typeof componentName === 'string') {
				return lazy(() =>
					loader(componentName).then((x) => ({
						default: x[componentName as U] as any as React.ComponentType<any>,
					})),
				)
			}
		},
	})
