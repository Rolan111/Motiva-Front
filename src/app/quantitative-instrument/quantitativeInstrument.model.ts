export class QuantitativeInstrumentModel {
  age: string;
  sex: string;
  ethnicity: string;
  civilStatus: string;
  zoneResidence: string;
  municipalityResidence: string;
  liveHome: string;
  typeHome: string;
  publicServices: string;
  educationLevel: string;
  occupation: string;
  workModality: string;
  socialSecutityPerception: string;
  quantityChildren: string;
  quantityDependents: string;

  constructor(age: string, sex: string, ethnicity: string, civilStatus: string, zoneResidence: string, municipalityResidence: string, liveHome: string, typeHome: string, publicServices: string, educationLevel: string, occupation: string, workModality: string, socialSecutityPerception: string, quantityChildren: string, quantityDependents: string) {
    this.age = age;
    this.sex = sex;
    this.ethnicity = ethnicity;
    this.civilStatus = civilStatus;
    this.zoneResidence = zoneResidence;
    this.municipalityResidence = municipalityResidence;
    this.liveHome = liveHome;
    this.typeHome = typeHome;
    this.publicServices = publicServices;
    this.educationLevel = educationLevel;
    this.occupation = occupation;
    this.workModality = workModality;
    this.socialSecutityPerception = socialSecutityPerception;
    this.quantityChildren = quantityChildren;
    this.quantityDependents = quantityDependents;
  }
}
