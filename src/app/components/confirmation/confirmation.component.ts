import { Component, EventEmitter, Output } from '@angular/core';

/**
 * This is a confirmation window. It confirms if the current
 * user wants to leave and lose unsaved changes while creating
 * or editing his entries.
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {

  /**
   * Emits 'yes' (true) or 'no' (false).
   */
  @Output() public response = new EventEmitter<boolean>();

  /**
   * Triggering of emiting of an according boolean.
   */
  public emitTrue(): void {
    this.response.emit(true);
  }

  /**
  * Triggering of emiting of an according boolean;
  */
 public emitFalse(): void {
    this.response.emit(false);
  }
}
