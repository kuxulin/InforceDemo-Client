import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlsTableComponent } from './urls-table/urls-table.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'urls', component: UrlsTableComponent },
  { path: '', redirectTo: '/urls', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
