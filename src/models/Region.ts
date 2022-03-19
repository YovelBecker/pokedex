import { v4 as uuid } from 'uuid';

export interface IRegion {
  id: string;
  name: string;
  regionId: number;
}

export class Region {

  id: string;
  name: string;
  regionId: number;

  constructor(
    regionId: number,
    name: string,
  ) {
    this.id = uuid();
    this.regionId = regionId
    this.name = name;
  }
}