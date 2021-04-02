import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { EditionModalService } from 'src/app/services/edition-modal.service';

/**
 * Reusable component intended to let user to edit entries.
 */
@Component({
  selector: 'app-movies-edition',
  templateUrl: './movies-edition.component.html',
  styleUrls: ['./movies-edition.component.css'],
})
export class MoviesEditionComponent {

  /** Outputting own visibility status for the parent component */
  @Output() public isVisible = new EventEmitter<boolean>();

  /** Movie data from outside the current component */
  @Input() public moviePayload: Movie;

  /** Defines if the movies edition is in popup state */
  @Input() public isPopUp: boolean;

  /** Getting the editing form */
  @ViewChild('editMovieForm') public editMovieForm: NgForm;

  /** Defines if the confirmation window's open */
  public isConfirmationOpen = false;
  constructor(private moviesService: MoviesService, private router: Router, private toggleService: EditionModalService) { }

  /**
   * Handling the response outside that component.
   * @param response Response on clicking 'Cancel' button.
   */
  public handleConfirmationResponse(response): void {
    if (response === true && this.isPopUp) {
      this.closePopUp();
    } else if (response === true && !this.isPopUp) {
      this.router.navigate(['../']);
    } else {
      this.closeConfirmation();
    }
  }
  /** Emits a value that closes the popup which is this component */
  public closePopUp(): void {
    this.toggleService.movieItemSubject.next(null)
  }
  /** Triggers the opening of the confirmation window */
  public confirmYourDecision(): void {
    if (this.editMovieForm.dirty) {
      this.isConfirmationOpen = true;
      return;
    }
    if (this.isPopUp) {
      this.closePopUp();
      return;
    }
    this.router.navigate(['../']);

  }
  /** Closes the confirmation window */
  public closeConfirmation(): void {
    this.isConfirmationOpen = false;
  }
  /** Closes the popup if it is and closes or redirects the user to the root  */
  public closeAndSave(): void {
    if (this.editMovieForm.valid) {
      this.isConfirmationOpen = false;
      this.router.navigate(['movies']);
      this.moviesService.saveChangesMovie(this.editMovieForm.value, this.moviePayload).then(() => {
        this.closePopUp();
      });
    }
  }
}
