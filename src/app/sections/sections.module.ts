import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SectionsRoutingModule} from "./sections-routing.module";
import {SectionsComponent} from "./sections/sections.component";
import {LynxTableModule} from "../Shared/lynx-table/lynx-table.module";
import {SectionEditComponent} from "./section-edit/section-edit.component";

@NgModule({
  imports: [
    CommonModule,
    LynxTableModule,
    SectionsRoutingModule
  ],
  declarations: [
    SectionsComponent,
    SectionEditComponent
  ]
})
export class SectionsModule { }
