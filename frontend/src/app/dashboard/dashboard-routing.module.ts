import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from "../product/product.component";
import {MapComponent} from "../map/map.component";
import {OrderComponent} from "../order/order.component";
import {ManageorderComponent} from "../manageorder/manageorder.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'manageorder',
        component: ManageorderComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'order',
        component: OrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
