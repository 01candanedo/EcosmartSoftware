import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
