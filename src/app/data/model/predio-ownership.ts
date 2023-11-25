export class PropertyOwnership {
  id: number;
  owner: string;
  gender: string;
  realEstateRegistrationNumber: string;
  titleDeed: TitleDeed;
  notary: Notary;
  propertyArea: string;

  constructor() {
    this.titleDeed = new TitleDeed();
    this.notary = new Notary();
  }
}
export class Owner {
  name: string;
  gender: string;
}

export class TitleDeed {
  number: number;
  day: string;
  month: string;
  year: string;
}

export class Notary {
  number: number;
  city: string;
}
