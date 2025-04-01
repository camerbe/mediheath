import { Media } from "./media";
import { MetaData } from "./meta-data";

export interface HomeDetail {
  id:string;
  location:string;
  open_hour:string;
  doctor_image:string;
  doctor_description:string;
  meta:MetaData;
  media:Media[];
}


