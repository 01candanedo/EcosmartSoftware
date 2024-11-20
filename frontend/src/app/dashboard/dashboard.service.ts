import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";
import {MaterialResponse} from "../../core/models/interfaces/Material";
import {RecyclingCenter} from "../../core/models/interfaces/Recycling";
import {GetOrderResponse} from "../../core/models/interfaces/Order";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) {}

  getProducts(token: string): Observable<MaterialResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<MaterialResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/product`,
      { headers }
    );
  }

  getOrders(token: string): Observable<GetOrderResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<GetOrderResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/order`,
      { headers }
    );
  }

  getRecyclingCenters(): Observable<RecyclingCenter> {
    return this.http.get<RecyclingCenter>(`${this.baseUrlUtil.getBaseUrl()}api/centers`);
  }

}
