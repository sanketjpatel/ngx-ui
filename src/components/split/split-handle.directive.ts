import { Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

@Directive({
  selector: '[ngxSplitHandle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-split-handle'
  }
})
export class SplitHandleDirective {

  @Output() drag = new EventEmitter();

  private mouseup$: Subscription;
  private mousemove$: Subscription;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const mouseDownPos = { x: event.clientX, y: event.clientY };

    const mouseup = Observable.fromEvent(document, 'mouseup');
    mouseup.subscribe((ev: MouseEvent) => this.onMouseup(ev));

    this.mousemove$ = Observable
      .fromEvent(document, 'mousemove')
      .takeUntil(mouseup)
      .subscribe((ev: MouseEvent) => this.onMouseMove(ev, mouseDownPos));
  }

  onMouseMove(event: MouseEvent, mouseDownPos: { x: number, y: number }): void {
    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;
    this.drag.emit({ x, y });
  }

  onMouseup(ev): void {
    this.mouseup$.unsubscribe();
    this.mousemove$.unsubscribe();
  }

}
