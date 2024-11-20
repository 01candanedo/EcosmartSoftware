import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {UserSession} from "../../core/models/interfaces/usersession.interface";
import {ToastController} from "@ionic/angular";
import {StorageService} from "../../core/store/StorageService.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  private storageService: StorageService = inject(StorageService);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    let toast: HTMLIonToastElement;
    if (this.loginForm?.valid) {
      const user = this.loginForm.value;
      this.loginService.postLoginUser(user).subscribe(
        async response  => {
          if(response.ok) {
            const ResponseObject: UserSession = {
              access_token: response.access_token,
              ok: response.ok
            }
            await this.storageService.set('UserSession', ResponseObject);
            setTimeout(() => this.router.navigate(['dashboard']));
          }
        },
        async error => {
          let msg: any = "general error";
          if (error.status === 400)
            msg = error.error.message
          else if (error.status === 401)
              msg = error.error.message
          else if(error.status === 500)
            msg = error.error.message
          toast = await this.toastController.create({
            message: msg,
            duration: 1500,
            position: 'top',
            color: "danger"
          });
          await toast.present()
          this.loginForm.reset();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
