import { RouterModule, Routes } from '@angular/router';

// Components
import { PeopleComponent } from './pages/people/people.component';


const appRoutes: Routes = [
    { path: 'people', component: PeopleComponent },
    // { path: 'recuperar-nip', component: RecuperarNipComponent },
    // { path: 'dashboard-web', component: DashboardWebComponent },
    // { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
