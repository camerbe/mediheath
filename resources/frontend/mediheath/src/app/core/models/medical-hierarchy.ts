export interface MedicalHierarchy {
  doctor:string;
  level?: number; // Optional property to indicate the level in the hierarchy
  image:string;
  children?: MedicalHierarchy[];

}
