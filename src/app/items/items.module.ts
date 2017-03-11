import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import {MaterialModule} from "@angular/material";
import {ItemsRoutingModule} from "./items-routing.module";
import {LynxTableModule} from "../Shared/lynx-table/lynx-table.module";
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";
import {ItemImagesComponent} from "../Shared/item-images/item-images.component";
import {DragulaModule} from "ng2-dragula";
import {ItemsComponent} from "./items/items.component";
import {ItemsEditComponent} from "./items-edit/items-edit.component";

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    MaterialModule,
    LynxTableModule,
    CKEditorModule,
    DragulaModule
  ],
  declarations: [
    ItemsComponent,
    ItemsEditComponent,
    ItemImagesComponent
  ]
})
export class ItemsModule {}
