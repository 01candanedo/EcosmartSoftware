import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrl} from "../../core/models/utils/BaseUrl";

interface User{
  name: string,
  lastname: string,
  email: string,
  password: string,
}

interface UserResponse{
  message: string,
  ok: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  postRegisterUser(userform: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrlUtil.getBaseUrl()+"auth/register", userform);
  }
}
