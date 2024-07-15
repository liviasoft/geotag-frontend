export type CountryCode = {
  id: string;
  name: string;
  phone_code: string;
  iso2: string;
  iso3: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
}

export type LocationContact = {
  id?: string;
  name   ?: string;
  address?: string;
  email  ?: string;
  phone  ?: string;
  created?: string;
  updated?: string;
}

export const CUSTOM_FIELD_TYPE = {
  Text : 'Text',
  Switch : 'Switch',
  Number : 'Number'
} as const

export type LocationType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconUrl: string;
  created: Date;
  updated: Date;
}

export type SavedLocation = {
  id: string;
  name: string;
  address: string | null;
  longitude: number;
  latitude: number;
  description: string | null;
  locationType: string;
  city: City | null;
  deviceData: object | null;
  additionalData: object | null;
  created: string;
  updated: string;
  locationTypeData?: LocationType;
}

export type DynamicCustomFieldType = keyof typeof CUSTOM_FIELD_TYPE

export type Country = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region_id: number;
  subregion_id: number;
  nationality: string;
  latitude: number;
  longitude: number;
}

export type State = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string | null;
}

export type City = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export type NearbyCity = City & {
  unitInWords: unknown;
  unit: unknown;
  distance: unknown;
}