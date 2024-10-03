import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";
import {RegisterResponseModel} from "../models/register-response.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  register(registerModel: RegisterRequestModel): Observable<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(this.apiUrl + "/register", registerModel);
  }
}
