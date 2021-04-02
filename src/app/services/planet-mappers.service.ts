import { Injectable } from '@angular/core';
import { PlanetDTO } from '../dto/planet-dto';
import { Planet } from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetMappersService {

  constructor() { }
  /**
   * Returns a planet entry to display.
   * @param payload Data to map from DB
   * @param docID Document ID of the collection
   */
  public planetMapper(payload: PlanetDTO, docID: string): Planet {
    return {
      climate: payload.fields.climate,
      created: payload.fields.created,
      diameter: payload.fields.diameter,
      edited: payload.fields.edited,
      gravity: payload.fields.gravity,
      name: payload.fields.name,
      orbitalPeriod: payload.fields.orbital_period,
      population: payload.fields.population,
      rotationPeriod: payload.fields.rotation_period,
      surfaceWater: payload.fields.surface_water,
      terrain: payload.fields.terrain,
      pk: payload.pk,
      model: payload.model,
      docId: docID,
    } as Planet
  };

}