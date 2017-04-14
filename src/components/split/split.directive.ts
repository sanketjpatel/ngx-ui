import { 
  Directive, Input, ChangeDetectionStrategy, ContentChild, 
  ContentChildren, AfterContentInit, QueryList
} from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleDirective } from './split-handle.directive';

@Directive({
  selector: '[ngxSplit]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-split'
  }
})
export class SplitDirective implements AfterContentInit {

  /*tslint:disable*/
  @Input('ngxSplit') 
  direction: string = 'vertial';
  /*tslint:enable*/

  @ContentChild(SplitHandleDirective) handle: SplitHandleDirective;
  @ContentChildren(SplitAreaDirective) areas: QueryList<SplitAreaDirective>;

  ngAfterContentInit(): void {
    console.log('ha', this.handle, this.areas);
    this.handle.drag.subscribe(pos => this.onDrag(pos));
  }

  onDrag({ x, y }): void {
    this.areas.forEach(area => {
      console.log('area', area);
    })
  }

}
