import { TestBed } from "@angular/core/testing";

import { NearestPlacesService } from "./nearest-places.service";

describe("NearestPlacesService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: NearestPlacesService = TestBed.get(NearestPlacesService);
    expect(service).toBeTruthy();
  });
});
