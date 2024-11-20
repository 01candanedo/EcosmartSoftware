import {Injectable} from "@angular/core";
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseUrl {

  getBaseUrl(): string {
    return environment.baseUrl;
  }

}
