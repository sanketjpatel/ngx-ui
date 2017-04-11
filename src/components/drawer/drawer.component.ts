import {
  Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation,
  trigger, transition, animate, style, state
} from '@angular/core';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'ngx-drawer',
  template: `
    <div class="ngx-drawer-content">
      <ng-template
        [ngTemplateOutlet]="template"
        [ngOutletContext]="{ manager: drawerManager, context: context }">
      </ng-template>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('drawerTransition', [
      state('left', style({
        transform: 'translateX(-100%)'
      })),
      state('bottom', style({
        transform: 'translateY(-100%)'
      })),
      transition('void => left', [
        animate(200, style({ transform: 'translateX(-100%)' }))
      ]),
      transition('void => bottom', [
        animate(200, style({ transform: 'translateY(-100%)' }))
      ]),
      transition('left => void', [
        animate(200, style({ transform: 'translateX(100%)' }))
      ]),
      transition('bottom => void', [
        animate(200, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class DrawerComponent {

  /**
   * CSS Class
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @Input() cssClass: string = '';

  /**
   * Direction of the drawer to open
   * 
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('@drawerTransition')
  @Input() direction: string;

  /**
   * Template for the drawer contents
   * 
   * @type {*}
   * @memberOf DrawerComponent
   */
  @Input() template: any;

  /**
   * Size of the drawer. A percentage.
   * 
   * @memberOf DrawerComponent
   */
  @Input() size: number;

  /**
   * Zindex of the drawer
   * 
   * @type {number}
   * @memberOf DrawerComponent
   */
  @HostBinding('style.zIndex')
  @Input() zIndex: number;

  /**
   * Context to passed to the drawer instance
   * 
   * @memberOf DrawerComponent
   */
  @Input() context: any;

  /**
   * Drawer close event
   * 
   * @memberOf DrawerComponent
   */
  @Output() close = new EventEmitter();

  /**
   * Drawer width calculation
   * @return {String} percentage width
   */
  @HostBinding('style.width')
  get widthSize() {
    if(this.isLeft) {
      const width = window.innerWidth;
      const innerWidth = this.size === undefined ? width : this.size;
      const widthPercent = (innerWidth / 100) * width;
      const newWidth = Math.ceil(widthPercent);
      return `${newWidth}px`;
    }

    return '100%';
  }

  /**
   * Drawer height calculation
   * @return {String} percentage height
   */
   @HostBinding('style.height')
   get heightSize() {
    if(this.isBottom) {
      const height = window.innerHeight;
      const size = this.size;
      const innerHeight = this.size === undefined ? height : this.size;
      const heightPercent = (innerHeight / 100) * height;
      const newHeight = Math.ceil(heightPercent);
      return `${newHeight}px`;
    }

    return '100%';
  }

  /**
   * Is the drawer a left opening drawer
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  get isLeft(): boolean {
    return this.direction === 'left';
  }

  /**
   * Gets the css classes for host
   * 
   * @readonly
   * @type {string}
   * @memberOf DrawerComponent
   */
  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-drawer';
    clz += ` ${this.cssClass}`;
    if(this.isLeft) clz += ' left-drawer';
    if(this.isBottom) clz += ' bottom-drawer';
    return clz;
  }  

  /**
   * Is the drawer a bottom of top drawer
   * 
   * @readonly
   * @type {boolean}
   * @memberOf DrawerComponent
   */
  get isBottom(): boolean {
    return this.direction === 'bottom';
  }

  constructor(private drawerManager: DrawerService) { }

  /**
   * Exit listener
   * 
   * @memberOf DrawerComponent
   */
  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }

}
