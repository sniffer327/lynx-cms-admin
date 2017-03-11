import {CategoryModel} from "./category.model";
import {ImageModel} from "./image.model";
/**
 * Created by sniffer on 19.11.16.
 */

export class ItemModel {
  public id?: number;
  public title: string;
  public subTitle: string;
  public categoryId: number;
  public CategoryTitle: string;
  public description: string;
  public body: string;
  public meta_keywords: string;
  public meta_description: string;
  public Priority: number;
  public DateCreating: Date;
  public DateEditing: Date;
  public ItemType: number;
  public ParentCategory: CategoryModel;
  public Images: ImageModel[] = [];
}
