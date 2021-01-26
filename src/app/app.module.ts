import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";
import { HeaderComponent } from "./components/header/header.component";
import { RestaurantInfoComponent } from "./components/restaurant-info/restaurant-info.component";

import { RatingModule } from "ng-starrating";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    HeaderComponent,
    RestaurantInfoComponent,
  ],
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
