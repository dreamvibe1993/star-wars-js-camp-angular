import { Injectable } from '@angular/core';
import { PersonDTO } from '../dto/person-dto';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class CharacterMappersService {

  constructor() { }
  /**
* Returns a person entry to display.
* @param payload Data to map from DB
* @param docID Document ID of the collection
*/
  public personMapper(payload: PersonDTO, docID: string): Person {
    return {
      birthYear: payload.fields.birth_year,
      created: payload.fields.created,
      edited: payload.fields.edited,
      eyeColor: payload.fields.eye_color,
      gender: payload.fields.gender,
      hairColor: payload.fields.hair_color,
      height: payload.fields.height,
      homeworld: payload.fields.homeworld,
      image: payload.fields.image,
      mass: payload.fields.mass,
      name: payload.fields.name,
      skinColor: payload.fields.skin_color,
      pk: payload.pk,
      model: payload.model,
      docId: docID,
    } as Person;
  }

}
