import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";
import {AuthService} from "../Services/auth.service";
import {LoginInfoModel} from "../Models/login-info.model";
import {Router} from "@angular/router";
import {LynxService} from "../Services/lynx.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // Информация о пользователе
  public loginInfo: LoginInfoModel;

  // Имя текущего сайта
  public currentSiteName: string;

  constructor(public authService: AuthService,
              private router: Router,
              private lynxService: LynxService,
              private localStorageService: LocalStorageService) {
  }

  /**
   * Выход из приложения
   * @constructor
   */
  public logOut(): void {
    this.authService.Logout();
  }

  /**
   * Назначаем отображаемй сайт
   * @param siteId id сайта
   * @param siteName Наименование сайта
   * @constructor
   */
  public changeSite(siteId: number, siteName: string): void {
    this.loginInfo.CurrentSiteId = siteId;

    this.currentSiteName = siteName;

    this.lynxService.Get("/Main/SetWorkingSite?siteId=" + siteId).subscribe(() => {
      this.router.navigate(['/']);
    }, error => console.log(error));
  }

  /**
   * Текущее состояние боковой панели
   * @returns {string|string}
   * @constructor
   */
  public sideNav(): string {
    let sideBarStatus = this.localStorageService.get('sidebar');

    return (sideBarStatus === 'closed') ? '' : 'sidenav-opened';
  }

  /**
   * Переключатель боковой панели
   * @constructor
   */
  public toggleSideNav(): void {
    let sideBarStatus = this.localStorageService.get('sidebar');

    if (!sideBarStatus) {
      this.localStorageService.set('sidebar', 'closed');

      return;
    }

    this.localStorageService.remove('sidebar');
  }

  ngOnInit() {
    this.authService.checkUserAuth().subscribe(res =>{
      this.loginInfo = res;
      let siteId = this.loginInfo.CurrentSiteId;

      let currentSite = this.loginInfo.UserSites.find((item) => item.id == siteId);
      this.currentSiteName = currentSite.siteName;
    });
  }

}
