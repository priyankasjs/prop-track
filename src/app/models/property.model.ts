export enum PropertyStatus {

  Occupied = 'Occupied',

  Vacant = 'Vacant'

}

export interface Property {

  id: string | number;

  name: string;

  address: string;

  monthlyRent: number;

  status: PropertyStatus;

  description?: string;

}