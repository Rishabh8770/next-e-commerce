export type AddressType = {
  firstName: string;
  lastName: string;
  address: string;
  subAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type CityData = {
  country: string;
  states: StateData[];
}

export type StateData = {
  state: string;
  cities: string[];
}
