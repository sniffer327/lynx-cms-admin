import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {ImageModel} from "../../Models/image.model";
import {DragulaService} from "ng2-dragula";
import {LynxService} from '../../Services/lynx.service';
import {Headers, Http, RequestOptions} from "@angular/http";
import {LynxConstants} from "../../lynx-constants";

@Component({
  selector: 'item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.scss']
})

export class ItemImagesComponent implements OnInit {
  @Input() images: ImageModel[];
  @Output() imagesChange = new EventEmitter<ImageModel[]>();

  public loading: boolean = false;

  constructor(private dragulaService: DragulaService, private lynxService: LynxService, private http: Http) {
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

  public addFiles(event: any): void {
    this.loading = true;
    const files = event.target.files;

    let formData = new FormData();

    let counter = 1;
    for (let file of files) {
      formData.append('file' + counter++, file, file.name);
    }

    let headers = new Headers();
    headers.set('Accept', 'multipart/form-data');
    let options = new RequestOptions({headers: headers});

    this.http.post(`${LynxConstants.apiUrl}/upload/UploadImages`, formData, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        if (res.message === 'success') {
          for (let item of res.data){
            let newImage = new ImageModel();
            newImage.path = item;
            this.images.unshift(newImage);
          }
        }
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  public deleteImage(image: ImageModel): void {
    this.images = this.images.filter((item) => item !== image);

    this.imagesChange.emit(this.images);
  }

  ngOnInit() {
  }

  ngOnDestroy() {

    // Уничтожаем images-bag при закрытии страницы
    this.dragulaService.destroy('images-bag');
  }

}
