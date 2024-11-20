import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        FormsModule,
        CommonModule,
        IonicModule,
        ProfileRoutingModule,
        ReactiveFormsModule
    ]
})
export class ProfileModule { }
