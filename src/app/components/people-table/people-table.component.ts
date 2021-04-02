import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GetPeopleService } from '../../services/get-people.service';
import { Planet } from '../../models/planet';
import { LoginStateService } from '../../services/login-state.service';
import { Person } from 'src/app/models/person';

/**
 * A table that displays all characters of SW lore.
 */
@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css'],
})

export class PeopleTableComponent {
  /**
  * All existing people (actors) in my db.
  */
  public myPeople$: Observable<Person[]>;

  /**
   * Hardcoded numbers for my pagination.
   */
  public pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  /**
   * Measure of actors to display per one page.
   */
  public itemsToDisplayPerPage = 10;

  /**
   * Checking the current page and getting all people data accordingly.
   */
  constructor(private getPeopleService: GetPeopleService, private router: Router,
              private route: ActivatedRoute, private loginStateService: LoginStateService) {
    this.myPeople$ = this.route.params.pipe(
      map(value => {
        return value.pageNumber as string;
      }),
      /** 
       * Multiplying pagenumber to ten in order to get the last index of a movie
       * e.g. page#1 = the last movie'll be 10th. So the next batch of movies are gonna be those
       * with personal key indexes > 10 but < 10 + 10 (knowing that we've got to diplay 10 movies at once).
       */
      switchMap(pageNumber => this.getPeopleService.subscribeToPeopleData(Number.parseInt(pageNumber) * 10)),
      );
    }

  /**
   * Listens the whole document if there was a key pressed. Turns pages according to the number of the current page.
   */
  @HostListener('document:keydown', ['$event'])
  public onDocumentKeydown(event: KeyboardEvent): void {
    const pageIndex = Number(this.route.snapshot.params['pageNumber']);
    if (event.key === 'ArrowLeft' && !this.loginStateService.noKeyboardPagination) {
      if (pageIndex > 1) {
        this.router.navigate(['people', pageIndex - 1]);
      }
    }
    if (event.key === 'ArrowRight' && !this.loginStateService.noKeyboardPagination) {
      if (pageIndex < 9) {
        this.router.navigate(['people', pageIndex + 1]);
      }
    }
  }

  /**
  * Compares current page number and the button index to assign the active class to a corresponding node.
  * @param index Button's consecutive index.
  */
  public matchButtonAndPagenumber(index: number): boolean {
    if (index === Number(this.route.snapshot.params['pageNumber'])) {
      return true;
    }
  }
}
