import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {DashboardService} from "./dashboard.service";
import {Material} from "../../core/models/interfaces/Material";
import {StorageService} from "../../core/store/StorageService.service";
import {Center} from "../../core/models/interfaces/Recycling";
import {Order} from "../../core/models/interfaces/Order";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public material_list: Material[] = [];
  public order_list: Order[] = [];
  public center_list: Center[] = [];
  private storageService: StorageService = inject(StorageService);

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  async ionViewWillEnter(){
    const async_storage = await this.storageService.get('UserSession');
    this.dashboardService.getProducts(async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          this.material_list = response.materials;
        }
      });
    this.dashboardService.getOrders(async_storage.access_token.toString()).subscribe(
      async response  => {
        if(response.ok) {
          this.order_list = response.orders;
        }
      });
    this.dashboardService.getRecyclingCenters().subscribe(
      async response => {
        if(response.ok) {
          this.center_list = response.centers;
        }
      }
    )
  }

  async logout() {
    await this.storageService.clear();
    this.router.navigate(['login']);
  }

  goToProduct() {
    this.router.navigate(["product"]);
  }

  goToOrder() {
    this.router.navigate(["order"]);
  }

  goToMap() {
    this.router.navigate(["map"]);
  }

  goToProfile(){
    this.router.navigate(["profile"]);
  }

  goToManageorder(){
    this.router.navigate(["manageorder"]);
  }
}
