import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GetPlanetsService } from '../../services/get-planets.service';
import { Planet } from '../../models/planet';
import { LoginStateService } from '../../services/login-state.service';
/**
 * A table that displays all planets of SW lore.
 */
@Component({
  selector: 'app-planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.css'],
})

export class PlanetsTableComponent {
  /**
  * All existing planets (actors) in my db.
  */
  public myPlanets$: Observable<Planet[]>;

  /**
  * Hardcoded numbers for my pagination.
  */
  public pages: number[] = [1, 2, 3, 4, 5, 6];

  /**
  * Measure of planets to display per one page.
  */
  public itemsToDisplayPerPage = 10;
  /**
   * Checking the current page and getting all planets' data accordingly.
   */
  constructor(private getPlanetsService: GetPlanetsService, private router: Router,
              private route: ActivatedRoute, private loginStateService: LoginStateService) {
    this.myPlanets$ = this.route.params.pipe(
      map(value => {
        return value.pageNumber as string;
      }),
      switchMap(pageNumber => this.getPlanetsService.subscribeToPlanetsData(Number(pageNumber) * 10)),
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
        this.router.navigate(['planets', pageIndex - 1]);
      }
    }
    if (event.key === 'ArrowRight' && !this.loginStateService.noKeyboardPagination) {
      if (pageIndex < 6) {
        this.router.navigate(['planets', pageIndex + 1]);
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
