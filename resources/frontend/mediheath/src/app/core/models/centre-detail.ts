import { Media } from "./media";
import { MetaData } from "./meta-data";

export interface CentreDetail {
  id:string;
  description:string;
  photo_1:string;
  photo_2:string;
  photo_3:string;
  photo_4:string;
  photo_5:string;
  photo_6:string;
  photo_7:string;
  photo_8:string;
  meta:MetaData;
  media:Media[];
}
