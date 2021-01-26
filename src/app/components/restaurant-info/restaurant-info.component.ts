import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { API_URLS } from "../../constants/api.constants";
import { RestaurantDetail } from "../..//models/Results.type";

@Component({
  selector: "app-restaurant-info",
  templateUrl: "./restaurant-info.component.html",
  styleUrls: ["./restaurant-info.component.scss"],
})
export class RestaurantInfoComponent implements OnInit {
  @Input() selectedRestaurant: RestaurantDetail;
  @Output() prevRestaurant = new EventEmitter();
  @Output() nxtRestaurant = new EventEmitter();
  @Output() bottomSheet = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  previousRestaurant(): void {
    this.prevRestaurant.emit();
  }

  nextRestaurant(): void {
    this.nxtRestaurant.emit();
  }

  openBottomSheet(): void {
    this.bottomSheet.emit();
  }

  photoUrl = (ref) => `${API_URLS.photo_endpoint}/${ref}`;
}
