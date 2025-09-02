export const routes = ['Home', 'Projects', 'Blog', 'Resume'] as const

export type routeOptions = typeof routes[number]