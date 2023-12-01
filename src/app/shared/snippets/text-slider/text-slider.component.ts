import { Component } from '@angular/core';

const overlapIndexTime = 800;
const intervalTime = 5000;
const itemWidth = 228;

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html',
  styleUrls: ['./text-slider.component.scss']
})

export class TextSliderComponent {

  index = 0;
  transitionTime = 400;
  slider: HTMLElement | undefined | null;
  timeouts: NodeJS.Timer[] = [];
  interval = this.createInterval();

  items: string[] = [
    'The Latest For Your New Post',
    'The Latest New For Your',
    'The Latest New'
  ];

  constructor() { }

  ngAfterContentChecked(): void {
    this.slider = document.getElementById('slides');
  }

  private createInterval(): NodeJS.Timer {
    this.timeouts.forEach((out: unknown) => window.clearTimeout(out as number))
    return setInterval(() => this.slide(1), intervalTime);
  }

  public slide(value: number, clear = false): void {
    this.updateIndex(value);
    this.updateSliderStyles();
  
    if (clear && this.interval) { 
      window.clearInterval(this.interval as unknown as number);
      this.timeouts.push(setTimeout(() => this.createInterval(), intervalTime));
    }
  }
  
  private updateIndex(value: number): void {
    const newIndex = this.index + value;
  
    if (newIndex < 0) {
      this.set(this.items.length - 1, overlapIndexTime);
    } else if (newIndex >= this.items.length) {
      this.set(0, overlapIndexTime);
    } else {
      this.set(newIndex, this.transitionTime);
    }
  }
  
  private updateSliderStyles(): void {
    if (this.slider) {
      const style = this.slider.style;
      style.transition = this.createTransitionStyle();
      style.transform = this.createTransformStyle();
    }
  }

  private createTransitionStyle(): string {
    return `all ${this.transitionTime}ms 0`;
  }

  private createTransformStyle(): string {
    return `translate3d(-${this.index * itemWidth}px, 0, 0)`;
  }

  private set(
    i: number,
    time: number
  ): void {
    this.index = i;
    this.transitionTime = time;
  }
  
}
