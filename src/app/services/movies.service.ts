import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { MoviesDTO } from '../dto/movies-dto';
import { Movie } from '../models/movie';
import { MovieTransferValue } from '../models/movies-transfer-value';
import { Person } from '../models/person';
import { Planet } from '../models/planet';

import { MovieMapperService } from './movie-mappers.service';
import { db } from '../../environments/firebase-config';

/** Single service for all movies' operations */
@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  constructor(private mapper: MovieMapperService) { }

  /**
  * Adds a movie a user's created.
  * Gets the films collection and adds a created movie into.
  * @param formPayload Data a user typed in the form.
  */
  public async add(formPayload: MovieTransferValue): Promise<firebase.firestore.DocumentReference> {
    try {
      const docRef = await db.collection('films').get()
        .then(querySnapshot => querySnapshot.docs.length)
        .then(indexNumber => {
          return db.collection('films').add({
            ...this.mapper.returnMovieDTO(formPayload, indexNumber),
          });
        })
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      return error;
    }
  }

  /**
   * Deletes an entry in the db.
   * @param documentID The current document's ID from the URL.
   */
  public async delete(documentID: string): Promise<void> {
    try {
      await db.collection('films').doc(documentID).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }

  /**
   * Saving specific fields in the db.
   * @param formPayload Data from a form.
   * @param moviePayload Data of a movie being edited.
   */
  public async saveChangesMovie(formPayload: MovieTransferValue, moviePayload: Movie): Promise<void> {
    try {
      await db.collection('films').doc(moviePayload.docId).
        update({
          'fields.title': formPayload.title,
          'fields.opening_crawl': formPayload.openingCrawl,
          'fields.producer': formPayload.producer,
          'fields.release_date': formPayload.releaseDate,
          'fields.director': formPayload.director,
          'fields.created': moviePayload.created ?? new Date,
          'fields.edited': new Date,
        });
      console.log('Document successfully updated!');
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Returns an observable to subscribe on. The observable is an array of movies.
   */
  public returnMovieDataObserver(): Observable<Movie[]> {
    const collectionReference = db.collection('films');
    return new Observable<Movie[]>(observer => {
      const snapshotTeardown = collectionReference.onSnapshot(docs => {
        const movies = [];
        docs.forEach(doc => {
          movies.push(this.mapper.returnMovieDomainModel(doc.data() as MoviesDTO, doc.id));
        });
        observer.next(movies);
      });
      return () => snapshotTeardown();
    });
  }

  /**
   * Gives up the 10 characters according to the movie a user currently displaying.
   * @param charactersArray Dependent array found in a particular movie's data.
   * If a movie doesn't have one the info isn't going to be displayed.
   */
  public getRelevantPeople(charactersArray?: number[]): Observable<Person[]> | null {
    return new Observable<Person[] | null>(subscribe => {
      if (charactersArray.length < 1) {
        subscribe.next(null);
      } else {
        charactersArray = charactersArray.splice(0, 10);
        const snapshotTeardown = db.collection('people')
          .where('pk', 'in', charactersArray)
          .onSnapshot((querySnapshot) => {
            const persons = [];
            querySnapshot.forEach((doc) => {
              const person = doc.data();
              persons.push(person);
            });
            subscribe.next(persons);
          });
        return () => snapshotTeardown();
      }
    });
  }

  /**
  * Gives up the 10 planets according to the page a user was at.
  * @param planetsArray Dependent array found in a particular movie's data.
  * If a movie doesn't have one the info isn't going to be displayed.
  */
  public getRelevantPlanets(planetsArray?: number[]): Observable<Planet[]> | null {
    return new Observable<Planet[] | null>(subscribe => {
      if (planetsArray.length < 1) {
        subscribe.next(null);
      } else {
        planetsArray = planetsArray.splice(0, 10);
        const snapshotTeardown = db.collection('planets')
          .where('pk', 'in', planetsArray)
          .onSnapshot((querySnapshot) => {
            const planets = [];
            querySnapshot.forEach((doc) => {
              const planet = doc.data();
              planets.push(planet);
            });
            subscribe.next(planets);
          });
        return () => snapshotTeardown();
      }
    });
  }

  /**
  * Getting the first movie found according to its title.
  * @param title The movie's title.
  */
  public findMovie(title: string): Observable<(firebase.firestore.DocumentData | Movie)[]> {
    return new Observable<(firebase.firestore.DocumentData | Movie)[]>(subscriber => {
      const snapshotTeardown = db.collection('films')
        .where('fields.title', '==', title)
        .onSnapshot((querySnapshot) => {
          const movies = [];
          querySnapshot.forEach(doc => {
            movies.push(this.mapper.returnMovieDomainModel(doc.data() as MoviesDTO, doc.id));
          });
          subscriber.next(movies);
        });
      return () => snapshotTeardown();
    });
  }
}
