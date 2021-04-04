import { Component, ViewChild, HostListener, DoCheck, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Movie } from './models/movie';

import { AuthService } from './services/auth.service';
import { LoginStateService } from './services/login-state.service';
import { MoviesService } from './services/movies.service';
import { EditionModalService } from './services/edition-modal.service';

/** Initial app component */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, AfterViewInit {

  /**
   * Getting the search form for movies.
   */
  @ViewChild('searchMovieForm') public searchForm: NgForm;

  /**
   * Getting the navbar brand elementRef (top left corner <a> element).
   */
  @ViewChild('navbar_brand') public navbarBrand: ElementRef;

  @ViewChild('navbar_mobile_menu') public navbarMenuMobile: ElementRef;


  /**
   * It was here since the beginning. Afraid to delete.
   */
  public title = 'StarWars';

  /**
   * Movie title payload from the search form input after submitted.
   */
  public movieTitleToSearch: string;

  /**
   * Visibility status of the login modal window
   */
  public loginModalVisibility = false;

  /**
   * State of the user's authentication.
   */
  public signInStatus$: Observable<unknown>;

  /** Active class status for 'planets label' at the main screen */
  public isPlanetsActive: boolean;

  /** Active class status for 'people label' at the main screen */
  public isPeopleActive: boolean;

  /** Movie to display observer for editing popup */
  public movieToDisplay$: BehaviorSubject<Movie>;

  /** Current location segment */
  public locationURLSegment: string;

  /** Getting signin status from the very beginning */
  constructor(private router: Router, private loginStateService: LoginStateService,
    private auth: AuthService, private moviesService: MoviesService,
    private editionModalStatus: EditionModalService, private route: ActivatedRoute) {
    this.signInStatus$ = this.auth.getSignInStatus();
    this.movieToDisplay$ = editionModalStatus.movieItemSubject

    router.events.subscribe(val => {
      this.locationURLSegment = location.pathname
    });

  }

  /**
   * Turns off the login modal window if Escape is pressed.
   */
  @HostListener('document:keydown', ['$event'])
  public onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.loginStateService.noKeyboardPagination = false;
      this.loginStateService.loginModalVisibility = false;
    }
  }

  /**
   * Assigning the modal visibility according the pagination's ability state.
   */
  public ngDoCheck(): void {
    this.loginModalVisibility = this.loginStateService.loginModalVisibility;
    if (this.router.url.includes('people')) {
      this.isPeopleActive = true;
    } else {
      this.isPeopleActive = false;
    }
    if (this.router.url.includes('planets')) {
      this.isPlanetsActive = true;
    } else {
      this.isPlanetsActive = false;
    }
  }

  /**
   * If using tabulation user switches to the background, the login modal window turns off.
   */
  public ngAfterViewInit(): void {
    this.navbarBrand.nativeElement.onfocus = () => {
      this.loginStateService.noKeyboardPagination = false;
      this.loginStateService.loginModalVisibility = false;
    };
  }

  /**
   * Toggles the login modal window on.
   */
  public makeLoginModalVisible(): void {
    this.loginStateService.noKeyboardPagination = true;
    this.loginStateService.loginModalVisibility = true;
  }

  /**
   * Hides login modal window.
   */
  public hideLoginModal(): void {
    this.loginStateService.noKeyboardPagination = false;
    this.loginStateService.loginModalVisibility = false;
  }

  /**
   * Pasting the movie's title into url and navigates accordingly.
   */
  public findMovie(): void {
    this.movieTitleToSearch = this.searchForm.value.searchInput;
    this.searchForm.reset();
    const localObservable = this.moviesService.findMovie(this.movieTitleToSearch).pipe(
      first(),
      map(movies => {
        if (movies.length > 0) {
          const id = movies.find(movie => movie.title === this.movieTitleToSearch).docId;
          this.router.navigate(['movies', this.movieTitleToSearch, id]);
        } else {
          this.router.navigate(['not-found']);
        }
      }),
    );
    localObservable.subscribe();
  }

  /**
   * Triggers a user's signing out procedure.
   */
  public signOut(): void {
    this.auth.signOut();
  }

  /**
   * Disables arrow pagination ability while user types a movie to search into the search input of the search form.
   * @param action Action that fires the function ('blur' || 'focus')
   */
  public disableOnKeyDownPagination(action: string): void {
    if (action === 'focus') {
      this.loginStateService.noKeyboardPagination = true;
    } else {
      this.loginStateService.noKeyboardPagination = false;
    }
  }

  public toggleNavbarMenuVisibility(): void {
    this.navbarMenuMobile.nativeElement.classList.toggle('collapse')
  }
}
