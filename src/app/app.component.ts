import { Component, OnInit, HostListener } from "@angular/core";
import { StarRatingComponent } from "ng-starrating";
import { forkJoin } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";

import { LocationService } from "./core/location-service/location.service";
import { NearestPlacesService } from "./core/nearest-places-service/nearest-places.service";
import { Places, ResultsEntity } from "./models/Places.type";
import { Result, Results } from "./models/Results.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "RestauX";
  API_KEY = "AIzaSyBORopmQV61I6to4mYy-4vM9jvxDoQAC-k";

  restaurantList: Results[];
  filteredRrestaurantList: Result[];
  selectedRestaurant: Result;
  selectedIndex: number = 0;
  height = window.innerHeight;
  width = window.innerWidth;
  lat: string;
  long: string;

  constructor(
    private nearestPlacesService: NearestPlacesService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationService.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.long = pos.lng;
      this.getRestaurants(this.lat, this.long);
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  getRestaurants(lat: string, long: string): void {
    this.nearestPlacesService
      .getPlaces(lat, long)
      .pipe(
        map((results) => results),
        mergeMap(({ results }) => {
          return forkJoin(
            results.map((result) => {
              return this.nearestPlacesService.getPlaceDetails(result.place_id);
            })
          );
        })
      )
      .subscribe((data) => {
        this.restaurantList = data;
        this.filteredRrestaurantList = this.filterRestaurants(
          this.restaurantList
        );
        this.selectedIndex = 0;
        this.selectedRestaurant = this.filteredRrestaurantList[
          this.selectedIndex
        ];
        console.log(this.filteredRrestaurantList);
      });
  }

  filterRestaurants(restaurantList: Results[]): Result[] {
    const filterdList: Results[] = [...restaurantList];
    return filterdList
      .map((data) => data.result)
      .filter(
        (data) =>
          data &&
          data.business_status === "OPERATIONAL" &&
          data.opening_hours &&
          data.opening_hours.open_now
      )
      .sort(
        (result, nextResult) =>
          nextResult.rating - result.rating ||
          nextResult.user_ratings_total - result.user_ratings_total
      );
  }

  photoUrl = (ref) =>
    `https://maps.googleapis.com/maps/api/place/photo?maxheight=823&photoreference=${ref}&key=${this.API_KEY}`;

  nextRestaurant() {
    if (this.selectedIndex <= this.filteredRrestaurantList.length - 2) {
      this.selectedIndex++;
      this.selectedRestaurant = this.filteredRrestaurantList[
        this.selectedIndex
      ];
    }
  }

  previousRestaurant() {
    if (this.selectedIndex >= 1) {
      this.selectedIndex--;
      this.selectedRestaurant = this.filteredRrestaurantList[
        this.selectedIndex
      ];
    }
  }
}
