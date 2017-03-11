import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SectionsComponent} from "./sections/sections.component";
import {SectionEditComponent} from "./section-edit/section-edit.component";

const routes: Routes = [
  {path: '', component: SectionsComponent},
  {path: 'edit', component: SectionEditComponent},
  {path: 'edit/:id', component: SectionEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SectionsRoutingModule {
}
