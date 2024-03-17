import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isShowen = false;

  constructor() {}

  @HostListener('click') toggleDropdown(event: Event) {
    this.isShowen = !this.isShowen;
  }
}
