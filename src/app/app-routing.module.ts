import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatcher, UrlSegment } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RamthaComponent } from './components/school/ramtha/ramtha.component';
import { AssfComponent } from './components/school/assf/assf.component';
import { AhlQuranComponent } from './components/school/ahlquran/ahlquran.component';
import { RssComponent } from './components/school/rss/rss.component';
import { MinistryComponent } from './components/school/ministry/ministry.component';


// Matches the given path ignoring case, e.g. /product/school/rss and /product/school/RSS.
export function caseInsensitive(path: string): UrlMatcher {
  const parts = path.toLowerCase().split('/');
  return (segments: UrlSegment[]) =>
    segments.length === parts.length && segments.every((s, i) => s.path.toLowerCase() === parts[i])
      ? { consumed: segments }
      : null;
}

const routes: Routes = [

  {path: '',      component: HomeComponent},
  {path: 'product/school',   pathMatch: 'full', redirectTo: '/'},
  {matcher: caseInsensitive('product/school/ramtha'), component: RamthaComponent},
  {matcher: caseInsensitive('product/school/assf'), component: AssfComponent},
  {matcher: caseInsensitive('product/school/ahlquran'), component: AhlQuranComponent},
  {matcher: caseInsensitive('product/school/RSS'), component: RssComponent},
  {matcher: caseInsensitive('product/school/ministry'), component: MinistryComponent},

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
