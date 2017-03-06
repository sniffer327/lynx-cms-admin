import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {ImageModel} from "../../Models/image.model";
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.scss']
})

export class ItemImagesComponent implements OnInit {
  @Input() images: ImageModel[];
  @Output() imagesChange = new EventEmitter<ImageModel[]>();

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('images-bag', {
      moves: function (el, container, handle) {

        // Костыль. Заточен под md-button
        let isDragulaTrigger = handle
          .parentElement
          .classList
          .contains('dragula-trigger');

        return isDragulaTrigger;
      }
    });
  }

  public addImage(): void {
    this.images.unshift(new ImageModel);
  }

  public deleteImage(image: ImageModel): void {
    this.images = this.images.filter((item) => item !== image);

    this.imagesChange.emit(this.images);
  }

  ngOnInit() {}

  ngOnDestroy() {

    // Уничтожаем images-bag при закрытии страницы
    this.dragulaService.destroy('images-bag');
  }

}
