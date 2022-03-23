import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';
import { UserListComponent } from './user-list/user-list/user-list.component';

const routes: Routes = [
  {path: 'statistics', component: StatisticsComponent},
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
