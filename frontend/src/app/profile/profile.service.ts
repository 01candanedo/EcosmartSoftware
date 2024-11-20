import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";
import {UserResponse} from "../../core/models/interfaces/User";
import {GetOrderResponse} from "../../core/models/interfaces/Order";
import {RewardsPutResponse, RewardsResponse} from "../../core/models/interfaces/Rewards";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  getUserData(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserResponse>(
      `${this.baseUrlUtil.getBaseUrl()}auth/profile`,
      { headers }
    );
  }

  getRewards(token: string): Observable<RewardsResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RewardsResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/rewards`,
      { headers }
    );
  }
}
