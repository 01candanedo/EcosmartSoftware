import {Component, inject } from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "./profile.service";
import {User} from "../../core/models/interfaces/User";
import {StorageService} from "../../core/store/StorageService.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public user: User | null = null;
  public money: string = "";
  private storageService: StorageService = inject(StorageService);

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { }

  async ionViewWillEnter() {
    const async_storage = await this.storageService.get('UserSession');
    this.profileService.getUserData(async_storage.access_token).subscribe(response => {
      if (response.ok) {
        this.user = response.user;
      }
    });

    this.profileService.getRewards(async_storage.access_token).subscribe(response => {
      if (response.ok) {
        this.money = response.rewards.toFixed(2)
      }
    });
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

}
