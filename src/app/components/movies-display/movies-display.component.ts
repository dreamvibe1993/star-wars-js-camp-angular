import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { Person } from '../../models/person';
import { Planet } from '../../models/planet';

/**
 * This is a component which displays the requested movie's data.
 */
@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrls: ['./movies-display.component.css'],
})

export class MoviesDisplayComponent implements OnInit {
  /**
   * Getting the form for editing movies.
   */
  @ViewChild('editMovieForm') public movieInformation: NgForm;

  /**
   * Boolean for buttons displaying
   */
  public isElementHidden = true;

  /**
   * All found information conserning the requested movie title.
   */
  public readonly foundInfo$: Observable<Movie>;

  /**
   * Observable rendering the spiner if 'if' statement is regarded.
   */
  public readonly spinnerVisibility$: Observable<Movie>;

  /**
  * Observable rendering the moviedata and toggling visibility of display form if 'if' statement is regarded.
  */
  public readonly displayFormVisibility$: Observable<Movie>;

  /**
   * Observable enabling editing ability and toggling visibility of display form if 'if' statement is regarded.
   */
  public readonly editFormVisibility$: Observable<Movie>;

  /**
  * Current user's signing in state.
  */
  public readonly signInStatus$: Observable<unknown>;

  /**
   * An array that is in effect only if there's movies
   * with the same title.
   */
  public moviesWithTheSameTitles = [];

  /**
   * An observable in case of displaying relative people.
   */
  public myPeople$: Observable<Person[]>;

  /**
   * An observable in case of displaying relative planets.
   */
  public myPlanet$: Observable<Planet[]>;

  /**
   * On initalization check current location and changes
   * an element's visibility.
   */
  public ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.isElementHidden = !this.isElementHidden;
    }
  }

  /**
   * Getting an Observable here in order to display movies realtime.
   */
  constructor(private route: ActivatedRoute, private moviesService: MoviesService,
    private router: Router, private auth: AuthService) {
    this.foundInfo$ = this.route.params.pipe(
      map(value => {
        return value.details as string;
      }),
      switchMap(title => this.moviesService.findMovie(title)
        .pipe(
          /** Since we don't know if there's movies with the same title... */
          publishReplay(),
          refCount(),
          map(docs => {
            let processedMovieData;
            /** We got a movie's ID from the URL */
            const movieIDFromURL = this.route.snapshot.params['movieID'];
            /** If we found nothing: redirect us to 'not-found' page */
            if (docs.length === 0) {
              this.router.navigate(['not-found']);
            } else if (docs.length > 1) {
              /** If there's more than one entry show us exactly what we need using the documentID we got from the URL */
              processedMovieData = docs.find(movie => movie.docId === movieIDFromURL);
            } else {
              /** If there's only one we implicitly gonna display only one */
              processedMovieData = docs[0];
            }
            /** If there's movies with the same name we filter the names in order to not pass the title of the movie we're gonna display  */
            /** Movies with the same titles are conditionally display in the html template. */
            this.moviesWithTheSameTitles = docs.filter(movie => movie.docId !== movieIDFromURL);

            /** Getting the relevant chars or planets */
            this.myPeople$ = this.moviesService.getRelevantPeople(processedMovieData.characters);
            this.myPlanet$ = this.moviesService.getRelevantPlanets(processedMovieData.planets);

            /** Return what we're gonna display */
            return processedMovieData;
          }),
        )),
    );
    /** Sharing status between observables in case of displaying multiple */
    this.spinnerVisibility$ = this.foundInfo$;
    this.displayFormVisibility$ = this.foundInfo$;
    this.editFormVisibility$ = this.foundInfo$;
    this.signInStatus$ = this.auth.getSignInStatus();
  }

  /**
   * Sending edited data to db in order to save it
   * using the documentID gotten from the URL.
   */
  public saveMovie(): void {
    const documentID = this.route.snapshot.params['movieID'];
    this.router.navigate(['movies']);
    this.moviesService.saveChangesMovie(this.movieInformation.value, documentID);
  }

  /**
   * Deletes an entry using the documentID gotten
   * from the URL.
   */
  public deleteMovie(): void {
    const documentID = this.route.snapshot.params['movieID'];
    this.moviesService.delete(documentID).then(() => {
      this.router.navigate(['movies']);
    });
  }
}
