import { Component, Input, Output, EventEmitter, HostBinding, ElementRef, ViewChild
} from '@angular/core';

@Component({
  selector: 'ngx-accordion-group',
  template: `
    <div class="panel panel-default">
      <h4
        class="panel-title"
        (click)="onClick()">
        <a role="button" href="#" *ngIf="header">
          <span [innerHTML]="header"></span>
          <span
            [class.icon-arrow-right]="!open"
            [class.icon-arrow-down]="open">
          </span>
        </a>
        <ng-content *ngIf="!header" select="accordion-header"></ng-content>
      </h4>
      <div class="panel-collapse collapse" [class.in]="open" [style.max-height]="maxHeight">
        <div class="panel-content">
          <ng-content select="accordion-content"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AccordionGroupComponent {

  @Input() header: string;

  @HostBinding('class.active')
  @Input() open: boolean;

  @HostBinding('class.accordion-group')
  css: boolean = true;

  @Input() maxHeight: string;

  @ViewChild('accordion-header') header;

  @Output() onToggle = new EventEmitter();

  constructor(private element: ElementRef) { }

  onClick(): void {
    this.onToggle.emit(this);
  }

  titleHeight(): number {
    return this.element.getElementsByClassName('panel-title')[0].getBoundingClientRect().height;
  }

  setMaxHeight(height): void {
    this.maxHeight = `${height}px`;
  }

}