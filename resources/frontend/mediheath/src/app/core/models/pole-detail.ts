import { Media } from "./media";
import { MetaData } from "./meta-data";

export interface PoleDetail {
  id:string;
  description:string;
  image:string;
  meta:MetaData
  media:Media[];
}
