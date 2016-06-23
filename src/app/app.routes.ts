import { provideRouter } from '@angular/router';
import { DashboardRoutes, AdminRoutes } from './routes';

export const routes = [
    ...DashboardRoutes,
    ...AdminRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];