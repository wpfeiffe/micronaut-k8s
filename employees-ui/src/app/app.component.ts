import { Component, OnInit } from '@angular/core';
import { ActuatorEndpoint, ActuatorService } from "./services/actuator.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sc-employees-ui';
  actuatorEndpoints$: Observable<ActuatorEndpoint[]>;

  constructor(private actuatorService: ActuatorService) {
  }

  ngOnInit() {
    this.actuatorEndpoints$ = this.actuatorService.getActuatorEndpoints();
  }

  openNew(event, href) {
    window.open(href);
  }
}
