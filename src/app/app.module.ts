import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { RatingModule } from "ng-starrating";
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBottomSheetModule,
} from "@angular/material";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";

@NgModule({
  declarations: [AppComponent, BottomSheetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RatingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
  ],
  providers: [],
  entryComponents: [BottomSheetComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
