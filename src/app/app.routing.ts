import {NgModule}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {CanActivateService} from "./Services/can-activate.service";
import {AuthorizationComponent} from "./authorization/authorization.component";

export const routes: Routes = [

  // Страница авторизации
  {
    path: 'auth',
    loadChildren: 'app/authorization/authorization.module#AuthorizationModule'
  },

  // Основной Layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ CanActivateService ],
    children: [

      // Главная страница
      {
        path: '', loadChildren: 'app/home/home.module#HomeModule'
      },

      // Страница с товарами
      {
        path: 'items', loadChildren: 'app/items/items.module#ItemsModule'
      },
      // Страница с разделами
      {
        path: 'sections', loadChildren: 'app/sections/sections.module#SectionsModule'
      }
    ]
  },

  // Некорректный маршрут
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateService]
})
export class AppRoutingModule {
}
