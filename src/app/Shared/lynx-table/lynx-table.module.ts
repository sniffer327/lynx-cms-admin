/**
 * Created by sniffer on 19.12.16.
 */
import {NgModule}      from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from "@angular/router";

import {LynxTableComponent} from "./lynx-table/lynx-table.component";
import {LynxItemComponent} from './lynx-item/lynx-item.component';
import {MaterialModule} from "@angular/material";
import {BoolPipe} from "../../Pipes/bool-pipe.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],

  declarations: [
    LynxTableComponent,
    LynxItemComponent
  ],

  providers: [
    DatePipe,
    BoolPipe
  ],

  exports: [LynxTableComponent]
})

export class LynxTableModule {
}
