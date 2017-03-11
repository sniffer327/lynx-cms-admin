import { Component, OnInit, Input } from '@angular/core';
import {IItemColumn, IItemTemplate} from "../Models/item.model";
import {DatePipe} from "@angular/common";
import {BoolPipe} from "../../../Pipes/bool-pipe.pipe";

@Component({
  selector: 'lynx-item',
  templateUrl: './lynx-item.component.html',
  styleUrls: ['./lynx-item.component.scss']
})

export class LynxItemComponent implements OnInit {

  // Содержимое элемента таблицы
  @Input() item: any;

  // Содержимое столбца в элементе
  @Input() column: IItemColumn;

  // Href для элемента с шаблоном ссылки
  public columnLink: string = '';

  // Параметр для ссылки
  public columnLinkParam: any;

  constructor(private datePipe: DatePipe,
  private boolPipe: BoolPipe) { }

  // Получем данные для ячейки
  public GetData(): any {

    // Получем pipe
    let columnPipe = this.column.pipe;

    // Получаем данные для столбца
    let columnData = this.column.data;

    // Получаем значение ячейки
    let data = this.item[columnData];

    // Если Pipe существует
    if (columnPipe) {
      return this.PipeTransform(data, columnPipe);
    }

    return data;
  }

  // Получаем шаблон
  public GetTemplate(): string {

    // Проверяем наличие шаблона у элемента
    if (!('template' in this.column)) {
      return null;
    }

    // Получаем шаблон для элемента
    let template = this.column.template;

    // Если ссылка
    if (template.type === 'link') {
      this.CreateLinkTemplate(template);
    }

    return template.type;
  }

  // Трансформируем данные через pipe
  private PipeTransform(column: any, pipe: string): any {

    switch (pipe){
      case "date": return this.datePipe.transform(column, 'dd-MM-yy');
      case "flag": return this.boolPipe.transform(column);

      default: return column;
    }
  }

  // Создаём шаблон для ссылки
  private CreateLinkTemplate(template: IItemTemplate): void {

    // Url для ссылки
    let link = template.linkUrl;

    // Параметр для url
    let param = template.param;

    // Обновляем значение ссылки
    if (link) {
      this.columnLink = link;
    }

    // Обновляем значение параметра
    if (param) {
      this.columnLinkParam = this.item[param];
    }
  }

  ngOnInit() {
  }

}
