import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesTableComponent } from './components/movies-table/movies-table.component';
import { PeopleTableComponent } from './components/people-table/people-table.component';
import { PlanetsTableComponent } from './components/planets-table/planets-table.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MoviesDisplayComponent } from './components/movies-display/movies-display.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SortingPipe } from './pipes/sorting.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthGuard } from './guards/auth.guard';
import { MoviesCreateComponent } from './components/movies-create/movies-create.component';
import { MoviesEditionComponent } from './components/movies-edition/movies-edition.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AboutPageComponent } from './components/about-page/about-page.component';


const appRoutes: Routes = [
  { path: 'movies', component: MoviesTableComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'movies/create', component: MoviesCreateComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'movies/:details/:movieID', component: MoviesDisplayComponent },
  { path: 'movies/:details/:movieID/edit', component: MoviesDisplayComponent, canActivate: [AuthGuard] },
  { path: 'people', component: PeopleTableComponent },
  { path: 'people/:pageNumber', component: PeopleTableComponent },
  { path: 'planets', component: PlanetsTableComponent },
  { path: 'planets/:pageNumber', component: PlanetsTableComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '',   redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesTableComponent,
    PeopleTableComponent,
    PlanetsTableComponent,
    PageNotFoundComponent,
    DropdownDirective,
    MoviesDisplayComponent,
    SortingPipe,
    SpinnerComponent,
    MoviesCreateComponent,
    MoviesEditionComponent,
    ConfirmationComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
