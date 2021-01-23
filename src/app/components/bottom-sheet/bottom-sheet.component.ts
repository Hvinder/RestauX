import { Component, Inject, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { Result } from "src/app/models/Results.type";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./bottom-sheet.component.html",
  styleUrls: ["./bottom-sheet.component.scss"],
})
export class BottomSheetComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Result) {}

  ngOnInit() {}
}
