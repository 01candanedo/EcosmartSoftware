import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ManageorderComponent} from "./manageorder.component";
import {ManageorderRoutingModule} from "./manageorder-routing.module";

@NgModule({
  declarations: [ManageorderComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ManageorderRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManageorderModule { }
