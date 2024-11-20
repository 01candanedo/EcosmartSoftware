import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {OrderComponent} from "./order.component";
import {OrderRoutingModule} from "./order-routing.module";


@NgModule({
  declarations: [OrderComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
