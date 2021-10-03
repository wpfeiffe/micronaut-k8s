import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  actuatorUrl = "/actuator";

  constructor(private httpClient: HttpClient) { }

  getActuatorEndpoints(): Observable<ActuatorEndpoint[]> {
    return this.httpClient.get<any>(this.actuatorUrl)
      .pipe(map(result => {
        let actuactorEndpoints: ActuatorEndpoint[] = [];
        for (var key in result._links) {
          if (result._links.hasOwnProperty(key)) {
            let actuatorEndpoint: ActuatorEndpoint = <ActuatorEndpoint> {};
            actuatorEndpoint.name = key;
            actuatorEndpoint.href = result._links[key].href;
            actuactorEndpoints.push(actuatorEndpoint);
          }
        }
        return actuactorEndpoints;
      })
    );
  }
}

export interface ActuatorEndpoint {
  name: String;
  href: String;
}

