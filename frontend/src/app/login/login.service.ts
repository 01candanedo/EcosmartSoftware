import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserSession} from "../../core/models/interfaces/usersession.interface";
import {BaseUrl} from "../../core/models/utils/BaseUrl";

interface User{
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrlUtil: BaseUrl = inject(BaseUrl);

  constructor(private http: HttpClient) { }

  postLoginUser(credentials: User): Observable<UserSession> {
    return this.http.post<UserSession>(this.baseUrlUtil.getBaseUrl()+"auth/login", credentials);
  }
}
