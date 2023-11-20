import { AfterContentChecked, Component } from '@angular/core';

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html',
  styleUrls: ['./text-slider.component.scss']
})

export class TextSliderComponent implements AfterContentChecked {

  i = 0;
  t = 400;
  slider: HTMLElement | undefined | null;
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

  public slide(value: number, clear = false): void {
    if (this.i + value < 0) this.set(this.items.length - 1, 800);
    else if (this.i + value >= this.items.length) this.set(0, 800);
    else this.set(this.i += value, 400);

    if (this.slider) {
      const style = this.slider.style;
      style.transition = `all ${this.t}ms 0`;
      style.transform = `translate3d(-${this.i * 228}px, 0, 0)`;
    }

    if (clear && this.interval) { window.clearInterval(this.interval as unknown as number); }
  }

  private set(
    index: number,
    time: number
  ): void {
    this.i = index;
    this.t = time;
  }

  private createInterval(): NodeJS.Timer {
    return setInterval(() => this.slide(1), 5000);
  }

}
