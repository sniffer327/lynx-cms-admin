import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LynxService} from "../../Services/lynx.service";

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {
  private isEdit: boolean;
  public id?: number;

  constructor(private lynxService: LynxService,
              private router: Router,
              private route: ActivatedRoute) {
    // Получаем id редактируемого item
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    // Определяем - редактирование ли это
    this.isEdit = !!(this.id);
  }

  ngOnInit() {
  }

}
