import { Routes } from '@angular/router';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { UserGrowthComponent } from '../components/user-growth/user-growth.component';

// import { SongsListComponent } from '../components/songs/songs.component';

export const routes: Routes = [

    //  {path:'',component:SongsListComponent},

    {path:'',component:LoginComponent},
    {path:"home",component:HomeComponent,
     children:
    [
        {path:'show-users',component:ShowUsersComponent},
        {path:'UserGrowth',component:UserGrowthComponent}

    ]},

    {path:'',component:ShowUsersComponent}
];
