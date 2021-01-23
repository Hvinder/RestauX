export interface RawRestaurantResponse {
  html_attributions?: null[] | null;
  result: RestaurantDetail;
  status: string;
}
export interface RestaurantDetail {
  address_components?: AddressComponentsEntity[] | null;
  adr_address: string;
  business_status: string;
  formatted_address: string;
  formatted_phone_number?: string | null;
  geometry: Geometry;
  icon: string;
  international_phone_number?: string | null;
  name: string;
  opening_hours?: OpeningHours | null;
  photos?: PhotosEntity[] | null;
  place_id: string;
  plus_code: PlusCode;
  price_level?: number | null;
  rating: number;
  reference: string;
  reviews?: ReviewsEntity[] | null;
  types?: string[] | null;
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  permanently_closed?: boolean | null;
  website?: string | null;
}
export interface AddressComponentsEntity {
  long_name: string;
  short_name: string;
  types?: string[] | null;
}
export interface Geometry {
  location: NortheastOrSouthwestOrLocation;
  viewport: Viewport;
}
export interface NortheastOrSouthwestOrLocation {
  lat: number;
  lng: number;
}
export interface Viewport {
  northeast: NortheastOrSouthwestOrLocation;
  southwest: NortheastOrSouthwestOrLocation;
}
export interface OpeningHours {
  open_now: boolean;
  periods?: PeriodsEntity[] | null;
  weekday_text?: string[] | null;
}
export interface PeriodsEntity {
  close?: CloseOrOpen | null;
  open: CloseOrOpen1;
}
export interface CloseOrOpen {
  day: number;
  time: string;
}
export interface CloseOrOpen1 {
  day: number;
  time: string;
}
export interface PhotosEntity {
  height: number;
  html_attributions?: string[] | null;
  photo_reference: string;
  width: number;
}
export interface PlusCode {
  compound_code: string;
  global_code: string;
}
export interface ReviewsEntity {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}
