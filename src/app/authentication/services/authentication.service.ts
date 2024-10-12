import {environment} from "../../../environments/environment.development";
import {Observable, of, switchMap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  checkFieldAvailability(field: string, value: string) {
    if (!value) return of(null);

    const params = new HttpParams()
      .set('field', field)
      .set('value', value);

    return this.http.get<{ available: string }>(`${this.apiUrl}/available`, { params }).pipe(
      switchMap(response => of(response.available === 'true'))
    );
  }

  register(registerModel: RegisterRequestModel): Observable<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(this.apiUrl + "/register", registerModel);
  }
}
