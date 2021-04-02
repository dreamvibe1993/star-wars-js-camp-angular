import { Injectable } from '@angular/core';

/**
 * Service that provides login modal window visibility status
 * and restrictions.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  /**
   * The keyboard pagination status while the login modal window is opened.
   * Restricts the ability to paginate planets' and people table segments
   * using keyboard arrows.
   */
  public noKeyboardPagination = false;

  /**
   * The login modal window visibility status.
   */
  public loginModalVisibility = false;
}
