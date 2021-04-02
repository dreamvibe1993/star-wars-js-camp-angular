import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { db } from '../../environments/firebase-config';
import { PersonDTO } from '../dto/person-dto';
import { Person } from '../models/person';
import { CharacterMappersService } from './character-mappers.service';

/** Service to get people into my people's table */
@Injectable({
  providedIn: 'root',
})
export class GetPeopleService {

  constructor(private mapper: CharacterMappersService) {}

  /**
   * Gives up the 10 people according to the page a user was at.
   * @param lastIndex Last person's index on the current page.
   */
  public subscribeToPeopleData(lastIndex: number): Observable<Person[]> {
    return new Observable<Person[]>(subscribe => {
      const snapshotTeardown = db.collection('people')
        .where('pk', '>', lastIndex - 10)
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const persons = [];
          querySnapshot.forEach((doc) => {
            const person = doc.data();
            persons.push(this.mapper.personMapper(person as PersonDTO, person.id));
          });
          subscribe.next(persons);
        });
      return () => snapshotTeardown();
    });
  }
}
