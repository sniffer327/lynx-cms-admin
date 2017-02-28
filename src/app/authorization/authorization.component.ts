import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {LynxLoginService} from "../Services/lynx-login.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private isLogedIn: LynxLoginService) {
  }

  /**
   * Вход в админку
   * @param login Логин
   * @param password Пароль
   */
  public login(login: string, password: string): void {

    this.authService.Login(login, password)
      .subscribe(
        res => {
          this.loginHandler(res);
        },

        error => this.loginHandler(error)
      );
  }

  /**
   * Обработчик входа в админку
   * @param response
   * @constructor
   */
  private loginHandler(response: any): void {

    if (response || response.email) {
      this.authService.CheckAuth();

      this.isLogedIn.setAuthData();

      this.router.navigate(['/']);

      console.log('Успешная авторизация');

    } else {

      console.log('Ошибка авторизации');
    }
  }

  ngOnInit() {}

}
