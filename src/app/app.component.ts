import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { forkJoin } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";

import { LocationService } from "./core/location-service/location.service";
import { NearestPlacesService } from "./core/nearest-places-service/nearest-places.service";
import { RestaurantDetail, RawRestaurantResponse } from "./models/Results.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "RestauX";
  restaurantList: RawRestaurantResponse[];
  filteredRrestaurantList: RestaurantDetail[];
  selectedRestaurant: RestaurantDetail;
  selectedIndex: number = 0;
  lat: string;
  long: string;
  xDown: number;
  yPos: number;

  constructor(
    private nearestPlacesService: NearestPlacesService,
    private locationService: LocationService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    // start registering touch & swipe gestures
    window.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      false
    );
    window.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this),
      false
    );

    this.locationService.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.long = pos.lng;
      this.getRestaurants(this.lat, this.long);
    });
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

  filterRestaurants(
    restaurantList: RawRestaurantResponse[]
  ): RestaurantDetail[] {
    const filterdList: RawRestaurantResponse[] = [...restaurantList];
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

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: this.selectedRestaurant,
    });
  }

  handleTouchStart(event): void {
    // gets the initial horizontal touch position
    this.xDown = event.touches[0].clientX;
    this.yPos = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    if (this.xDown) {
      const xUp = event.touches[0].clientX;
      const yNewPos = event.touches[0].clientY;
      // gets the total swipe length along the horizontal axis
      const xDiff = this.xDown - xUp;
      const yDiff = Math.abs(this.yPos - yNewPos);
      // left and right swipe will be considered if user swipes vertically less than 100px
      if (yDiff === 0 || Math.abs(xDiff) > yDiff) {
        if (xDiff > 0) {
          // left swipe
          this.nextRestaurant();
        } else {
          // right swipe
          this.previousRestaurant();
        }
      }
      // reset initial touch position
      this.xDown = null;
    }
  }
}
