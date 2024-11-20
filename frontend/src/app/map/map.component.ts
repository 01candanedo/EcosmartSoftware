import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import {Router} from "@angular/router"; // Importa Leaflet

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor(private router: Router) {

  }
  goBack() {
    this.router.navigate(['dashboard']);
  }

}
