import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appMessageBoxPositionDirective]'
})
export class MessageBoxPositionDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const style = getComputedStyle(this.el.nativeElement, null);
    const h: any = style.height.substring(0, style.height.indexOf('px'));
    const w: any = style.width.substring(0, style.width.indexOf('px'));
    this.el.nativeElement.style.margin = `${ -h / 2 }px 0 0 ${ -w / 2 }px`;
  }
}
