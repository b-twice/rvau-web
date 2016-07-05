import { provideRouter } from '@angular/router';
import { DashboardRoutes, AdminRoutes, AuthRoutes, AUTH_PROVIDERS } from './routes';

export const routes = [
    ...AuthRoutes,
    ...DashboardRoutes,
    ...AdminRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AUTH_PROVIDERS
];
