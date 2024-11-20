import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Router} from "@angular/router";

/*@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  photo: string | undefined;

  constructor(
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['dashboard']);
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  }
}*/
