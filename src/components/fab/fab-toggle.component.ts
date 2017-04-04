import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'fab-toggle',
  template: `
    <a
      href="#"
      #anchor
      class="fab-toggle"
      (click)="onClick.emit($event)">
      <span
        *ngIf="icon"
        [class]="'icon-' + icon">
      </span>
      <ng-content></ng-content>
    </a>
  `
})
export class FabToggle {

  @Input() icon;

  @Output() onClick = new EventEmitter();

  @ViewChild('anchor') element;

}
