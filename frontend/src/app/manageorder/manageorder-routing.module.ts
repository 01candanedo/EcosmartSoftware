import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageorderComponent} from "./manageorder.component";

const routes: Routes = [
  {
    path: '',
    component: ManageorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageorderRoutingModule {}
