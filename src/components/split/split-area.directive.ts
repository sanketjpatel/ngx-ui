import { Directive, Input, ChangeDetectionStrategy } from '@angular/core';

@Directive({
  selector: '[ngxSplitArea]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-split-area'
  }
})
export class SplitAreaDirective {

}
