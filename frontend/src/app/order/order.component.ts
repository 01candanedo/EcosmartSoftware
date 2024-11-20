import {Component, inject } from '@angular/core';
import {Router} from "@angular/router";
import {Material} from "../../core/models/interfaces/Material";
import {Center} from "../../core/models/interfaces/Recycling";
import {StorageService} from "../../core/store/StorageService.service";
import {CreateOrder, Order} from "../../core/models/interfaces/Order";
import {OrderService} from "./order.service";
import {ToastController} from "@ionic/angular";
import {DashboardService} from "../dashboard/dashboard.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  public material_list: Material[] = [];
  public center_list: Center[] = [];
  public order_list: Order[] = [];
  selectedItems: Material[] = [];
  currentSelection: Material | null = null;
  center_selected: number = 0;
  private storageService: StorageService = inject(StorageService);
  private async_storage: any;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private dashboardService: DashboardService,
    private toastController: ToastController,
  ) {}

  async ionViewWillEnter() {
    this.async_storage = await this.storageService.get('UserSession');
    const orderResponse = await firstValueFrom(
      this.dashboardService.getOrders(this.async_storage.access_token.toString())
    );
    if (orderResponse.ok) {
      this.order_list = orderResponse.orders;
      const productResponse = await firstValueFrom(
        this.dashboardService.getProducts(this.async_storage.access_token.toString())
      );
      if (productResponse.ok) {
        const values: Material[] = [];
        for (let order of this.order_list) for (let material of order.materials) values.push(material);
        this.material_list = productResponse.materials.filter(item =>
          !values.some(value => value.material_id === item.material_id)
        );
      }
    }

    const centerResponse = await firstValueFrom(
      this.dashboardService.getRecyclingCenters()
    );

    if (centerResponse.ok) this.center_list = centerResponse.centers;
  }

  get remainingItems(): Material[] {
    return this.material_list.filter(item => !this.selectedItems.includes(item));
  }

  addItem() {
    if (this.currentSelection && !this.selectedItems.includes(this.currentSelection)) {
      this.selectedItems.push(this.currentSelection);
      this.currentSelection = null;
    }
  }

  removeItem(item: Material) {
    this.selectedItems = this.selectedItems.filter(i => i !== item);
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  public crearOrden() {
    let toast: HTMLIonToastElement;
    const createOrder: CreateOrder = {
      materials: this.selectedItems.map(item => ({
        material_id: item.material_id,
        center_id: this.center_selected
      }))
    };
    this.orderService.postCreateOrder(createOrder, this.async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          toast = await this.toastController.create({
            message: "Orden creada exitosamente",
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
