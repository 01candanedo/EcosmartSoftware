import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

interface UserResponse {
  message: string,
  ok: boolean,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  private duration: number = 1500;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    let toast: HTMLIonToastElement;
    if (this.registerForm?.valid) {
      const user = this.registerForm.value;
      this.registerService.postRegisterUser(user).subscribe(
        async response  => {
          if(response.ok) {
            toast = await this.toastController.create({
              message: response.message,
              duration: this.duration,
              position: 'top',
              color: "success"
            });
            await toast.present()
            setTimeout(() => this.router.navigate(['login']), this.duration);
          }
        },
        async error => {
          let msg: any = "general error";
          if (error.status === 400)
            msg = error.error.message
          else if(error.status === 500)
            msg = error.error.message
          toast = await this.toastController.create({
            message: msg,
            duration: this.duration,
            position: 'top',
            color: "danger"
          });
          await toast.present()
          this.registerForm.reset();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
