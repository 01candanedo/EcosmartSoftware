import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";
import {GetOrderResponse, OrderResponseChanges} from "../../core/models/interfaces/Order";
import {Rewards, RewardsPutResponse, RewardsResponse} from "../../core/models/interfaces/Rewards";

@Injectable({
  providedIn: 'root'
})
export class ManageorderService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  getOrders(token: string): Observable<GetOrderResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<GetOrderResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/order`,
      { headers }
    );
  }

  deleteCompleteOrder(order_id: number, token: string): Observable<OrderResponseChanges> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<OrderResponseChanges>(
      `${this.baseUrlUtil.getBaseUrl()}api/complete-order`,
      {
        headers: headers,
        body: { order_id: order_id },
      });
  }

  deleteOrder(order_id: number, token: string): Observable<OrderResponseChanges> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<OrderResponseChanges>(
      `${this.baseUrlUtil.getBaseUrl()}api/order`,
      {
        headers: headers,
        body: { order_id: order_id },
      });
  }

  putRewards(ammount: Rewards, token: string): Observable<RewardsPutResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<RewardsPutResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/rewards`,
      ammount,
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
