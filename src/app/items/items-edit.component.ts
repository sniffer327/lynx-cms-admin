import {Component, OnInit} from "@angular/core";
import {Params, Router, ActivatedRoute} from "@angular/router";

import {LynxLoggingService} from "../Services/lynx-logging.service";

import {LynxService} from "../Services/lynx.service";

import {CategoryModel} from "../Models/category.model";
import {ItemModel} from "../Models/item.model";

@Component({
  selector: 'items-edit',
  templateUrl: './items-edit.component.html'
})
export class ItemsEditComponent implements OnInit {

  private isEdit: boolean;
  public item: ItemModel;
  public id?: number;
  public backPage: string;

  // Наименование категории
  public categoryName: string;

  public categories: CategoryModel[];

  constructor(private lynxService: LynxService,
              private router: Router,
              private route: ActivatedRoute) {

    // Получение url параметра
    this.route.url.subscribe(res => {
      let tmp = res[0].path;

      // Определяем что редактировать
      switch (tmp) {
        case 'edit-goods':
          this.backPage = 'items';
          this.categoryName = 'товара';
          break;
        case 'edit-pages':
          this.backPage = 'pages';
          this.categoryName = 'страницы';
          break;
        case 'edit-news':
          this.backPage = 'news';
          this.categoryName = 'новости';
          break;
        default:
          this.backPage = 'items';
          this.categoryName = 'товара';
          break;
      }
    });

    // Получаем id редактируемого item
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    // Определяем - редактирование ли это
    (this.id) ? this.isEdit = true : this.isEdit = false;
  }

  // Получаем данные item
  public getItemInfo(): void {

    this.lynxService.Get('/Items/GetItem?itemId=' + this.id)
      .subscribe(
        res => {
          this.item = res;

          // Сортируем изображения по приоритету
          this.item.Images.sort((prev, next) => (prev.Priority > next.Priority) ? 1 : -1);

          LynxLoggingService.Log('Данные о товаре: ', res);
        }
      )
  }

  // Обновление item
  public save(exit?: boolean): void {

    // Выставляем приоритет для изображений
    if (this.item.Images) {
      this.item.Images.forEach((item, index) => item.Priority = index);
    }

    this.lynxService.Post('/Items/UpdateItem', this.item).subscribe(
      res => {
        if (exit === true){
          this.router.navigate(['/' + this.backPage]);
        }
      },
      error => LynxLoggingService.Error('Ошибка при обновлении', error)
    );

    LynxLoggingService.Log('Сохраняю: ', this.item);
  }

  // Удаление item
  public deleteItem(): void {
    this.lynxService.Get('/Items/DeleteItem?itemId=' + this.id).subscribe(
      res => {
        this.router.navigate(['/' + this.backPage]);
      },
      error => LynxLoggingService.Error('Ошибка при удалении', error)
    );
  }

  /**
   * Получение списка товаров
   * @constructor
   */
  public getCategories(): void {

    this.lynxService.Post('/Items/GetCategoriesAsync', {})
      .subscribe(
        res => {
          this.categories = res.Result;
        }
      );
  }

  ngOnInit() {

    // Если редактирование
    if (this.isEdit) {
      this.getItemInfo();
    } else {
      this.item = new ItemModel();

      // Записываем в модель принадлежность текущего item
      switch (this.backPage) {
        case 'items':
          this.item.ItemType = 1;
          break;
        case 'news':
          this.item.ItemType = 2;
          break;
        case 'pages':
          this.item.ItemType = 3;
          break;
        default:
          this.item.ItemType = 1;
          break;
      }
    }

    // Список категорий
    this.getCategories();
  }

}
