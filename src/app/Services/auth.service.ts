import {Injectable} from '@angular/core';
import {LynxService} from "./lynx.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {LynxLoggingService} from "./lynx-logging.service";
import {LynxLoginService} from "./lynx-login.service";
import {LoginInfoModel} from "../Models/login-info.model";

@Injectable()
export class AuthService {

  constructor(private lynxService: LynxService,
              private router: Router,
              private logInService: LynxLoginService) {
  }

  /**
   * Главный LogIn обработчик
   * @param login {String} Логин
   * @param password {String} Пароль
   * @returns {Observable<any>}
   * @constructor
   */
  public Login(login: string, password: string): any {
    return this.lynxService.Post("/Account/Login", {
      email: login,
      password: password
    });
  }

  /**
   * Главный LogOut обработчик
   * @constructor
   */
  public Logout(): void {

    this.lynxService.Get('/Account/LogOut').subscribe(
      () => {
        this.logInService.DestroyAuthData();
        this.router.navigate(['/auth']);
        LynxLoggingService.Log('Выход из аккаунта');
      },

      error => LynxLoggingService.Log('Ошибка LogOut ', error)
    );
  }

  public static LoginInfo: LoginInfoModel = new LoginInfoModel();

  public LoginInfo: LoginInfoModel;

  public CheckAuth(): void {
    this.checkUserAuth()
      .subscribe(
        res => {
          LynxLoggingService.Log('Проверка авторизации ', res);
          AuthService.LoginInfo = this.LoginInfo = res;
        },
        () => {
          this.router.navigate(['/auth']);
          LynxLoggingService.Error('Пользователь не авторизован');
        }
      );
  }

  /**
   * Проверка авторизации
   * @returns {Observable<any>}
   * @constructor
   */
  public checkUserAuth(): Observable<LoginInfoModel> {
    return this.lynxService.Get('/Account/CheckAuth');
  }
}
