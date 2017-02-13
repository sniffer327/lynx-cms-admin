import {SitesModel} from "./sites.model";
/**
 * Модель, получаемая при логине
 */
export class LoginInfoModel {
  public Email: string;
  public Name: string;
  public RoleId?: number;
  public CurrentSiteId?: number;
  public UserSites: SitesModel[];
}
