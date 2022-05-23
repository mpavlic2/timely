import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelyprojectlistComponent } from './timelyprojectlist/timelyprojectlist.component';

const routes: Routes = [
  {path:'', component:TimelyprojectlistComponent},
  {path:'**', component:TimelyprojectlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
