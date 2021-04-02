import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';

import firebase from 'firebase/app';
import { EditionModalService } from 'src/app/services/edition-modal.service';

/**
 * Component to display movies into a table.
 */
@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css'],
})
export class MoviesTableComponent {
  /**
  * All existing movies in my db.
  */
  public readonly myMovies$: Observable<Movie[]>;

  /**
  * Current user's signing in state.
  */
  public readonly signInStatus$: Observable<firebase.User>;

  /**
   * Default sorting method for the movies' table dates.
   */
  public sortingMethod = SortTypes.ascending;



  /** Editing component visibility status */
  // public isEditionModalHidden = true;

  /** Getting the movies and signin status of the current user */
  constructor(private moviesService: MoviesService, private auth: AuthService,
    private togglerService: EditionModalService) {
    this.myMovies$ = this.moviesService.returnMovieDataObserver();
    this.signInStatus$ = this.auth.getSignInStatus();
  }

  /** Toggles and displays the edition component */
  public toggleEditionModal(movies: Movie[], movieDocID: string): void {
    const movieToEdit = movies.find(movie => movieDocID === movie.docId)
    this.togglerService.movieItemSubject.next(movieToEdit)
  }
  /** Swithes sort direction */
  public switchSortingMethod(): void {
    this.sortingMethod = this.sortingMethod === SortTypes.ascending ? SortTypes.descending : SortTypes.ascending;
  }
}

/**
 * Enum for sort directions
*/
enum SortTypes {
  /** Ascending sort direction: sorts dates from newest to oldest */
  ascending = 'asc',
  /** Descending sort direction: sorts dates from oldest to newest */
  descending = 'desc',
}
