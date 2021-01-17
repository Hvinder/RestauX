import { Component, OnInit, HostListener } from "@angular/core";
import { StarRatingComponent } from 'ng-starrating';

import { LocationService } from "./core/location-service/location.service";
import { NearestPlacesService } from "./core/nearest-places-service/nearest-places.service";
import { Places, ResultsEntity } from "./models/Places.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "RestauX";
  API_KEY = "AIzaSyBORopmQV61I6to4mYy-4vM9jvxDoQAC-k";

  restaurantsList: Places;
  filteredRestaurantsList: ResultsEntity[];
  selectedRestaurant: ResultsEntity;
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
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.lat = pos.lat;
      this.long = pos.lng;
      this.getRestaurants(this.lat, this.long);
    });
    // this.locationService.getLocation().subscribe((loc) => {
    //   console.log(loc.coords.latitude, loc.coords.longitude);
    //   this.lat = loc.coords.latitude;
    //   this.long = loc.coords.longitude;
    //   this.getRestaurants(this.lat, this.long);
    // });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  getRestaurants(lat: string, long: string): void {
    this.nearestPlacesService.getPlaces(lat, long).subscribe((data) => {
      this.restaurantsList = data;
      this.filteredRestaurantsList = this.filterData(this.restaurantsList);
      this.selectedIndex = 0;
      this.selectedRestaurant = this.filteredRestaurantsList[
        this.selectedIndex
      ];
      console.log(this.filteredRestaurantsList);
    });
  }

  filterData(restaurants: Places): ResultsEntity[] {
    const filteredRestaurants: Places = { ...restaurants };
    // Add result.opening_hours.open_now below
    filteredRestaurants.results = restaurants.results
      .filter(
        (result) =>
          result.business_status === "OPERATIONAL" &&
          result.opening_hours &&
          result.opening_hours.open_now
      )
      .sort(
        (result, nextResult) =>
          nextResult.rating - result.rating ||
          nextResult.user_ratings_total - result.user_ratings_total
      );
    return filteredRestaurants.results;
  }

  photoUrl = (ref) =>
    `https://maps.googleapis.com/maps/api/place/photo?maxheight=823&photoreference=${ref}&key=${this.API_KEY}`;

  nextRestaurant() {
    if (this.selectedIndex <= this.filteredRestaurantsList.length - 2) {
      this.selectedIndex++;
      this.selectedRestaurant = this.filteredRestaurantsList[
        this.selectedIndex
      ];
    }
  }

  previousRestaurant() {
    if (this.selectedIndex >= 1) {
      this.selectedIndex--;
      this.selectedRestaurant = this.filteredRestaurantsList[
        this.selectedIndex
      ];
    }
  }
}
