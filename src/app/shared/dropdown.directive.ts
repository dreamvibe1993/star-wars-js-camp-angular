import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

/** Directive that opens any dropdown and closes if you misclick it or choose to click another one */
@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective {
    constructor(private el: ElementRef) { }
    /** Getting the class state */
    @HostBinding('class.open') public isOpen = false;
    /** Listening to a click event of the element which is tagged by the directive */
    @HostListener('click', ['$event'])
    public toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }
    /** Listening to a click on the whole document in order to close any opened dropdown */
    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        const targetElement = event.target as HTMLElement;
        const tableCellDropdownElement = this.el.nativeElement;
        if (targetElement && !tableCellDropdownElement.contains(targetElement)) {
            if (this.isOpen) {
                this.isOpen = !this.isOpen;
            }
        }
    }
}
