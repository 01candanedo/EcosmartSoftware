import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";
import {CategoryResponseData} from "../../core/models/interfaces/Category";
import {CreateOrder, OrderResponse} from "../../core/models/interfaces/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  postCreateOrder(order: CreateOrder, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<OrderResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/order`,
      order,
      { headers }
    );
  }

  getCategories(): Observable<CategoryResponseData> {
    return this.http.get<CategoryResponseData>(`${this.baseUrlUtil.getBaseUrl()}api/category`);
  }

}
