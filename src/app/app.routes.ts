import { Router, RouterModule } from '@angular/router';
import { AdminRoutes, UserRoutes, authProviders } from './routes';
export const routes = [
    ...UserRoutes,
    ...AdminRoutes
];

export const appRoutingProviders: any[] = [
    authProviders,
];

export const routing = RouterModule.forRoot(routes);
