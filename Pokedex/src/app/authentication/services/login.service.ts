import { Injectable } from '@angular/core';
import {BaseService} from "../../common/services/BaseService";
import {MessagesService} from "../../messages/services/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationTokens} from "../models/authentication-tokens.models";
import {catchError, Observable, tap} from "rxjs";
import {ErrorResponse} from "../models/error-response.models";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http: HttpClient, messagesService: MessagesService) {
    super(messagesService)
  }

  /**
   * Try to authenticate the user to the API using the provided email and password.
   * If there is no error on response, returns an Authentication tokens.
   *
   * @param email The user email to log-in.
   * @param password The user password to log-in
   */
  postLogin(email: string, password: string): Observable<AuthenticationTokens> {
    const url = this.baseApiUrl + "auth/login"
    const body = {
      email,
      password,
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<AuthenticationTokens>(url, body, {headers}).pipe(
      tap(() => this.log(`authenticated user with ${email}`)),
      catchError(this.handleError<AuthenticationTokens>(`Trying to authenticate user with ${email}`))
    )
  }
}
