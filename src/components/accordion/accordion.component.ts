import { Input, Component, ContentChildren, HostBinding, ElementRef } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';
import './accordion.scss';
export { AccordionGroup };

@Component({
  selector: 'ngx-accordion',
  template: `
    <ng-content></ng-content>
  `
})
export class AccordionComponent {

  @Input()
  @HostBinding('class.full-height')
  fullHeight: boolean = false;

  @Input() closeOnExpand: boolean = true;

  @Input() maxHeight;

  @ContentChildren(AccordionGroup) groups;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('panel-group');
    this.element.classList.add('accordion');
  }

  ngAfterContentInit(): void {
    this.groups.forEach(g => g.onToggle.subscribe(this.toggled.bind(this)));
  }

  ngAfterContentChecked(): void {
    this.updateHeights();
  }

  updateHeights(){
    if (!this.closeOnExpand) return;

    if (!this.maxHeight){
      this.maxHeight = parseInt(window.getComputedStyle(this.element).maxHeight);
    }

    if (isNaN(this.maxHeight)){
      this.maxHeight = window.innerHeight;
      this.element.style.maxHeight = `${maxHeight}px`;
    }

    let titleHeight = this.groups.first.titleHeight();
    let maxGroupHeight = this.maxHeight - this.groups.length * titleHeight;

    for (let g of this.groups){
      g.setMaxHeight(maxGroupHeight);
    }
  }

  toggled(selected) {
    selected.open = !selected.open;
    if(this.closeOnExpand) {
      for (let g of this.groups){
        if (g === selected) {
          continue;
        }
        g.open = false
      }
    }
  }
}

export const ACCORDION_COMPONENTS = [
  Accordion, AccordionGroup
];