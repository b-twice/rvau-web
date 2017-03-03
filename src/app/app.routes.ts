import { RouterModule } from '@angular/router';
import { authProviders } from './user/user.routes';
const routes = [
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing = RouterModule.forRoot(routes);

