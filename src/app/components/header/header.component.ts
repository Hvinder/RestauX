import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Output() toggle = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  navToggle(): void {
    this.toggle.emit();
  }
}
