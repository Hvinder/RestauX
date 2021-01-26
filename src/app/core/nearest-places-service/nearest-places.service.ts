import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Places } from "../../models/Places.type";
import { API_URLS } from "../../constants/api.constants";

@Injectable({
  providedIn: "root",
})
export class NearestPlacesService {
  placesUrl = `${API_URLS.places_endpoint}`;

  placeDetailsUrl = `${API_URLS.placeDetails_endpoint}`;
  constructor(private http: HttpClient) {}

  getPlaces(
    lat: string = "-33.8670522",
    long: string = "151.1957362",
    radius: string = "1500"
  ): Observable<Places> {
    return this.http.post<Places>(this.placesUrl, { lat, long, radius });
  }

  getPlaceDetails(id: string): Observable<any> {
    return this.http.post<any>(this.placeDetailsUrl, { id });
  }
}
