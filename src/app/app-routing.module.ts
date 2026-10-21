import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatcher, UrlSegment } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RamthaComponent } from './components/school/ramtha/ramtha.component';
import { AssfComponent } from './components/school/assf/assf.component';
import { AhlQuranComponent } from './components/school/ahlquran/ahlquran.component';
import { RssComponent } from './components/school/rss/rss.component';
import { IgaComponent } from './components/school/iga/iga.component';
import { MinistryComponent } from './components/school/ministry/ministry.component';
import { SchoolOverviewComponent } from './components/school/overview/school-overview.component';


// Matches the given path ignoring case, e.g. /product/school/rss and /product/school/RSS.
export function caseInsensitive(path: string): UrlMatcher {
  const parts = path.toLowerCase().split('/');
  return (segments: UrlSegment[]) =>
    segments.length === parts.length && segments.every((s, i) => s.path.toLowerCase() === parts[i])
      ? { consumed: segments }
      : null;
}

// Every page exists twice: at its plain path (English) and under /ar (Arabic), so search
// engines can index each language at its own URL. LanguageService reads the prefix.
function pageRoutes(): Routes {
  return [
    {path: '',      component: HomeComponent},
    // data.defaultLang: opens in that language unless the visitor picked another one.
    // data.lang: page only exists in that language. data.seo: key of the page's head tags.
    {matcher: caseInsensitive('product/school'), component: SchoolOverviewComponent, data: {defaultLang: 'ar', seo: 'school'}},
    {matcher: caseInsensitive('product/school/ramtha'), component: RamthaComponent, data: {lang: 'ar'}},
    {matcher: caseInsensitive('product/school/assf'), component: AssfComponent, data: {lang: 'ar'}},
    {matcher: caseInsensitive('product/school/ahlquran'), component: AhlQuranComponent, data: {lang: 'ar'}},
    {matcher: caseInsensitive('product/school/RSS'), component: RssComponent, data: {lang: 'ar'}},
    {matcher: caseInsensitive('product/school/iga'), component: IgaComponent, data: {lang: 'ar'}},
    {matcher: caseInsensitive('product/school/ministry'), component: MinistryComponent, data: {lang: 'ar'}},
  ];
}

const routes: Routes = [

  {path: 'ar', children: pageRoutes()},
  ...pageRoutes(),

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
