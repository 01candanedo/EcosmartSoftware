import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {MapRoutingModule} from "./map-routing.module";
import {MapComponent} from "./map.component";

@NgModule({
  declarations: [MapComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    MapRoutingModule
  ]
})
export class MapModule { }
