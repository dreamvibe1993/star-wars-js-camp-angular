import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Planet } from '../models/planet';

import { db } from '../../environments/firebase-config';
import { PlanetMappersService } from './planet-mappers.service';
import { PlanetDTO } from '../dto/planet-dto';

/** The service to get planets into my table */
@Injectable({
  providedIn: 'root',
})
export class GetPlanetsService {

  constructor (private mapper: PlanetMappersService) {}
  
  /**
   * Gives up the 10 planets according to the page a user was at.
   * @param lastIndex Last planet's index on the current page.
   */
  public subscribeToPlanetsData(lastIndex: number): Observable<Planet[]> {
    return new Observable<Planet[]>(subscribe => {
      const snapshotTeardown = db.collection('planets')
        .where('pk', '>', lastIndex - 10)
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const planets = [];
          querySnapshot.forEach((doc) => {
            const planet = doc.data();
            planets.push(this.mapper.planetMapper(planet as PlanetDTO, planet.id));
          });
          subscribe.next(planets);
        });
      return () => snapshotTeardown();
    });
  }
}
