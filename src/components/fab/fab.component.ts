import {
  Component,
  Input,
  ContentChildren,
  ContentChild,
  ElementRef,
  HostListener
} from '@angular/core';

import { FabToggle } from './FabToggle.js';
import { FabButton } from './FabButton.js';
import './fab.scss'

@Component({
  selector: 'fab',
  directives: [ FabToggle, FabButton ],
  template: `
    <nav
      class="fab-menu"
      [class.active]="active">
      <ng-content></ng-content>
    </nav>
  `
})
export class Fab {

  @Input() dir = 'right';
  @ContentChild(FabToggle) toggle;
  @ContentChildren(FabButton) buttons;

  get active() {
    return this._active;
  }

  set active(val) {
    this.updateButtons(val);
    this._active = val;
  }

  ngAfterContentInit() {
    this.toggle.onClick.subscribe(() => {
      this.active = !this.active;
    });
  }

  getTranslate(idx) {
    if(this.dir === 'right') {
      return `translate3d(${ 60 * idx }px,0,0)`;
    } else if(this.dir === 'down') {
      return `translate3d(0,${ 60 * idx }px,0)`;
    } else {
      console.error(`Unsupported direction for Fab; ${this.dir}`);
    }
  }

  updateButtons(active) {
    let idx = 1;
    for(let { element } of this.buttons) {
      let style = element.nativeElement.style;
      style['transition-duration'] = active ? `${ 90 + (100 * idx) }ms` : '';
      style['transform'] = active ? this.getTranslate(idx) : '';
      idx++;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    const toggleElm = this.toggle.element.nativeElement;
    if(this.active && !toggleElm.contains(target)) {
      this.active = false;
    }
  }

}

export const FAB_COMPONENTS = [
  FabToggle,
  FabButton,
  Fab
];
