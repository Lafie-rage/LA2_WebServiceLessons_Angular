import {Component, OnInit} from '@angular/core';
import {LoginValidator} from "./LoginValidator";
import {FormControl, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {AuthenticationTokens} from "../models/authentication-tokens.models";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  matcher = new LoginValidator()

  emailFormControl = new FormControl('', [Validators.email, Validators.required])

  requiredFieldFormControl = new FormControl('', [Validators.required])

  constructor(private api: LoginService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Callback when the log-in button is clicked on.
   * Try to authenticate the user.
   * Doesn't manage user-friendly display but display the errors on the logs.
   * If the user is successfully authenticated, redirect him to its team view.
   *
   * @param email The typed email.
   * @param password The typed password.
   */
  login(email: string, password: string) {
    if (this.areFieldValuesValid()) { // Try to connect the user only if provided values are valid
      this.api.postLogin(email, password).subscribe(result => {
        const token = <AuthenticationTokens>result
        const jwtToken = jwtDecode(token.access_token)
        if (token.access_token !== undefined) {
          let expiresAt = (<any>jwtToken).exp // Extract the expiration date from the JWT
          // Should be an authentication token
          this.cookieService.set("JWT_TOKEN_ACCESS", token.access_token, {secure: true})
          this.cookieService.set("JWT_TOKEN_REFRESH", token.refresh_token, {secure: true})
          this.cookieService.set("JWT_TOKEN_EXPIRES_AT", String(expiresAt), {secure: true})
          this.router.navigateByUrl('/')
        }
      })
    }
  }

  /**
   * Return whether the login fields are valid.
   * This means if the email & password are not empty and the email match an email pattern.
   *
   * @return True if the fields are valid, false otherwise.
   *
   * @private
   */
  private areFieldValuesValid() {
    return !this.emailFormControl.hasError('required') &&
      !this.emailFormControl.hasError('email') &&
      !this.requiredFieldFormControl.hasError('required')
  }
}
