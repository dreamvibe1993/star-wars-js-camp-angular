import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MoviesService } from '../../services/movies.service';

/**
 * Component with an ability to create a new movie entry.
 */
@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.css'],
})
export class MoviesCreateComponent {
  /**
   * Gets the form form the html template.
   */
  @ViewChild('createMovieForm') private createMovieForm: NgForm;

  constructor(private readonly movieService: MoviesService, 
              private readonly router: Router) { }

  /**
   * Confirmation window state.
   */
  public isConfirmationOpen = false;

  /**
   * Handles an outputted boolean from confirmation window.
   * If true => means cancel creation/editing and go up to rootcomponent.
   * If false => close confirmation modal and continue to create/edit.
   */
  public handleConfirmationResponse(response): void {
  if (response === true) {
      this.router.navigate(['../']);
    } else {
      this.closeConfirmation();
    }
  }

  /**
   * If cancel's been pressed but the form inputs were touched opens the
   * confirmation window. Else just redirects to the rootcomponent.
   */
  public confirmYourDecision(): void {
    if (this.createMovieForm.touched) {
      this.isConfirmationOpen = true;
    } else {
      this.router.navigate(['../']);
    }
  }

  /**
   * Closes confirmation window applying the corrseponding variable a
   * falsy value.
   */
  public closeConfirmation(): void {
    this.isConfirmationOpen = false;
  }

  /**
   * Adds an entry to the db.
   */
  public saveMovie(): void {
    this.movieService.add(this.createMovieForm.value).then(() => {
      this.router.navigate(['../movies']);
    });
  }
}
