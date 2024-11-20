import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";
import {ProductResponse} from "../../core/models/interfaces/Product";
import {CategoryResponseData} from "../../core/models/interfaces/Category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  postCreateProduct(productForm: FormData, token: string): Observable<ProductResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ProductResponse>(
      `${this.baseUrlUtil.getBaseUrl()}api/product`,
      productForm,
      { headers }
    );
  }

  getCategories(): Observable<CategoryResponseData> {
    return this.http.get<CategoryResponseData>(`${this.baseUrlUtil.getBaseUrl()}api/category`);
  }

}
