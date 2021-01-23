import { Component, OnInit, HostListener } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { StarRatingComponent } from "ng-starrating";
import { forkJoin } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";

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

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  getRestaurants(lat: string, long: string): void {
    this.nearestPlacesService
      .getPlaces()
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
