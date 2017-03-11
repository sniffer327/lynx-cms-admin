import {Component, OnInit} from '@angular/core';
import {LynxLoggingService} from "../Services/lynx-logging.service";
import {LynxService} from "../Services/lynx.service";
import {ActivatedRoute} from "@angular/router";
import {SectionModel} from "../Models/section.model";
import {IItemColumn} from "../Shared/lynx-table/Models/item.model";

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  public sectionList: Array<SectionModel>;

  // Столбцы таблицы
  public itemsColumns: IItemColumn[];

  constructor(private lynxService: LynxService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Параметры таблицы с товарами
    this.itemsColumns = [
      {
        header: 'ID',
        data: 'id'
      },
      {
        header: 'Название',
        data: 'name',
        /*template: {
          type: 'link',
          linkUrl: '/items/' + this.editUrlSegment,
          param: 'id'
        },*/
        styles: {
          'text-align': 'left'
        }
      },
      {
        header: 'Альтернативное название',
        data: 'alterName'
      },
      {
        header: 'Отображается?',
        data: 'visible'
      }
    ];

    this.getSections();
  }

  private getSections(): void {
    this.lynxService.Post('/Sections/GetSectionsList', {})
      .subscribe(
        res => {
          this.sectionList = res.Result;

          LynxLoggingService.Log('Список разделов ', res.Result);
        }
      );
  }

}
