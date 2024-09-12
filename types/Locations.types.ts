import type { User } from "./user.types";

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
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  created?: string;
  updated?: string;
}

export const CUSTOM_FIELD_TYPE = {
  Text: 'Text',
  Switch: 'Switch',
  Number: 'Number'
} as const

export type LocationType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconUrl: string;
  created: Date;
  updated: Date;
  _count?: {
    locations: number
  }
}

export type DeviceData = {
  ipAddress: string;
  port: number;
  [key: string]: string | number | boolean
}

export const locationFields = [
  'name',
  'address',
  'longitude',
  'latitude',
  'description',
  'deviceData',
  'city',
  'contacts',
  'image',
  'imageUrl',
  'created',
  'updated',
  'connectionStatus',
  'lastConnectionStatusCheck',
  'useRemoteConnection',
  'remoteHTTPUrl',
  'remoteTCPUrl',
  'isLocked',
]

export type SavedLocation = {
  id: string;
  name: string;
  address: string | null;
  longitude: number;
  latitude: number;
  description: string | null;
  locationType: string;
  city: City | null;
  deviceData: DeviceData | null;
  additionalData: object | null;
  created: string;
  updated: string;
  locationTypeData?: LocationType;
  addedBy?: string,
  addedByData?: Partial<User>,
  image?: string,
  imageUrl?: string,
  connectionStatus?: string,
  lastConnectionStatusCheck?: Date,
  useRemoteConnection: boolean,
  remoteHTTPUrl?: string,
  remoteTCPUrl?: string,
  isLocked?: boolean,
  contacts?: Array<LocationContact>,
  connectionTestLoading: boolean,
  deviceFilesLoading: boolean,
}

export type LocationNote = {
  id: string;
  note: string;
  isSystemNote: boolean;
  author?: string | null;
  location: string | null;
  measurementFile?: string | null;
  type: string | null;
  details?: any | null;
  created?: Date;
  updated?: Date;
  locationData?: SavedLocation
  authorData?: User
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

export type DeviceCommand = { 
  id: string; 
  title: string;
  command: string;
  commandType: string;
  description: string;
  parameters?: string | null;
  queryReturn?: string | null;
  defaultValue?: string | null;
  defaultUnit?: string | null;
  range?: string | null;
}

export type MeasurementFile = {
  id: string;
  file: string;
  fileUrl: string;
  location: string;
  fileName: string;
  timeStamp: Date;
  metadataId?: string;
  fileDeviceUrl: string;
  created?: Date;
  updated?: Date;
  _count?: {
    notes?: number,
    traces?: number,
    points?: number,
  }

  metadata?: MeasurementMetadata;
  notes: LocationNote[];
  traces: Trace[];
  points: Point[];
  locationData?: SavedLocation
}

export type MeasurementMetadata = {
  id: string;
  Limit?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  deviceId?: string;
  timeStart?: Date;
  gpsTimeStamp?: Date;
  axisDwellTime?: number;
  frequencyRange?: string;
  numberOfSatellites?: number;
  numberOfMeasurements?: number;
  measurementTimeInSeconds?: number;
  created?: string;
  updated?: string;

  device?: SavedLocation;
  measurementFiles: MeasurementFile[];
  measurements: Measurement[];
  traces: Trace[]
}

export type Trace = {
  id: string;
  name: string;
  measurementId?: string;
  measurementMetadataId?: string;
  measurementFileId?: string;
  created?: string;
  updated?: string;

  measurementMetadata?: MeasurementMetadata
  measurementFile?: MeasurementFile;
  measurement?: Measurement;
  points: Point[];
  _count?: {
    points?: number
  }
}

export type Point = {
  pointNum: string;
  amplitude_DBMV: number;
  frequency_MHz: number;
  amplitude_VM: number;
  referenceEMFLimit: number;
  exposureRatio: number;
  traceId: string;
  measurementFileId: string;
  trace: Trace;
  measurementFile: MeasurementFile;
}

export type Measurement = {
  id: string;
  avg_DBM_M2: number;
  min_DBM_M2: number;
  max_DBM_M2: number;
  test_status: string;
  time_in_seconds: number;
  total_avg_DBM_M2: number;
  total_min_DBM_M2: number;
  total_max_DBM_M2: number;
  total_time_in_seconds: number;
  measurementMetadataId?: string;
  created?: string;
  updated?: string;

  measurementMetadata?: MeasurementMetadata
  traces: Trace[]
}
