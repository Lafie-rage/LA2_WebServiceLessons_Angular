import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-pokedex-team',
  templateUrl: './pokedex-team.component.html',
  styleUrls: ['./pokedex-team.component.scss']
})
export class PokedexTeamComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.checkIfUserIsAuthenticated()
  }

  /**
   * Check if the user is authenticated.
   * If he's not, redirect him to the login page.
   *
   * @private
   */
  private checkIfUserIsAuthenticated() {
    const token = {
      access_token: this.cookieService.get("JWT_TOKEN_ACCESS"),
      refresh_token: this.cookieService.get("JWT_TOKEN_REFRESH"),
      expires_at: this.cookieService.get("JWT_TOKEN_EXPIRES_AT"),
    }

    if (token.access_token === undefined ||
      token.access_token.length === 0 ||
      Date.parse(token.expires_at) > Date.now()) {
      // If there is no token saved, or it has expired, we must ask the user to reconnect
      this.router.navigateByUrl('login')
    }
  }


}
