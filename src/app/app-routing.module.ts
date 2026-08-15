import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SchoolComponent } from './components/school/school.component';
import { RamthaComponent } from './components/school/ramtha/ramtha.component';
import { AssfComponent } from './components/school/assf/assf.component';


const routes: Routes = [

  {path: '',      component: HomeComponent},
  {path: 'product/school',   component: SchoolComponent},
  {path: 'product/school/ramtha',   component: RamthaComponent},
  {path: 'product/school/assf',   component: AssfComponent},

  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  {path: '**', pathMatch: 'full', redirectTo: '/'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
