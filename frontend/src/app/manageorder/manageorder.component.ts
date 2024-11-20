import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Order} from "../../core/models/interfaces/Order";
import {StorageService} from "../../core/store/StorageService.service";
import {ManageorderService} from "./manageorder.service";
import {ToastController} from "@ionic/angular";
import {ProfileService} from "../profile/profile.service";

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.scss'],
})
export class ManageorderComponent {
  public order_list: Order[] = [];
  private storageService: StorageService = inject(StorageService);
  public selectedOrderId: number = 0;
  private async_storage: any;

  constructor(
    private router: Router,
    private manageorderService: ManageorderService,
    private toastController: ToastController,
    private profileService: ProfileService,
  ) { }

  async ionViewWillEnter(){
    this.async_storage = await this.storageService.get('UserSession');
    this.manageorderService.getOrders(this.async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          this.order_list = response.orders;
        }
      });
  }

  getSelectedOrder() {
    return this.order_list.find(order => order.order_id === this.selectedOrderId);
  }

  deleteOrder() {
    let toast: HTMLIonToastElement;
    this.manageorderService.deleteOrder(this.selectedOrderId, this.async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          toast = await this.toastController.create({
            message: response.message,
            duration: 1500,
            position: 'top',
            color: "success"
          });
          await toast.present()
          setTimeout(() => this.router.navigate(['dashboard']), 1500);
        }
      },
      async error => {
        let msg: any = "An error has occurred";
        if (error.status === 400)
          msg = error.error.message
        else if (error.status === 404)
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
      }
    );
  }

  completeOrder(){
    let toast: HTMLIonToastElement;
    this.manageorderService.deleteCompleteOrder(this.selectedOrderId, this.async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          toast = await this.toastController.create({
            message: response.message,
            duration: 1500,
            position: 'top',
            color: "success"
          });
          await toast.present()
          await this.calculateAmmount();
          setTimeout(() => this.router.navigate(['dashboard']), 1500);
        }
      },
      async error => {
        let msg: any = "An error has occurred";
        if (error.status === 400)
          msg = error.error.message
        else if (error.status === 404)
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
      }
    );
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  async calculateAmmount(){
    let value: number = 0;
    let toast: HTMLIonToastElement;
    this.profileService.getRewards(this.async_storage.access_token).subscribe(response => {
      if (response.ok) value = response.rewards
    });
    this.manageorderService.putRewards({
      ammount: ((Math.random() * (1.00 - 0.25)) + 0.25) + value
    }, this.async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          toast = await this.toastController.create({
            message: response.message,
            duration: 1500,
            position: 'top',
            color: "success"
          });
          await toast.present()
        }
      },
      async error => {
        let msg: any = "An error has occurred";
        if (error.status === 400)
          msg = error.error.message
        else if (error.status === 404)
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
      }
    );
  }

}
