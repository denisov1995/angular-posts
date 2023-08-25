import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPostColor]',
})
export class PostColorDirective {
  constructor(private render: Renderer2, private element: ElementRef) {}

  randColor() {
    const colorsArr = [
      '#003153',
      '#957B8D',
      '#3D2B1F',
      '#47A76A',
      '#9B2D30',
      '#911E42',
      '#C154C1',
      '#1C1C1C',
      '#1560BD',
      '#01796F',
    ];
    const rand = Math.floor(Math.random() * colorsArr.length);
    return colorsArr[rand];
  }

  ngOnInit() {
    this.render.setStyle(this.element.nativeElement, 'color', this.randColor());
  }
}
