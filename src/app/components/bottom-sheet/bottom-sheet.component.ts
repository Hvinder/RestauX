import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { RestaurantDetail } from "src/app/models/Results.type";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./bottom-sheet.component.html",
  styleUrls: ["./bottom-sheet.component.scss"],
})
export class BottomSheetComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: RestaurantDetail) {}

  ngOnInit() {}
}
