import { Media } from "./media";
import { MetaData } from "./meta-data";

export interface OtherTeamDetail {
  id:string;
  titre:string;
  doctor_1:string;
  image_doctor_1:string;
  doctor_2:string;
  image_doctor_2:string;
  doctor_3:string;
  image_doctor_3:string;
  meta:MetaData;
  media:Media[];
}
