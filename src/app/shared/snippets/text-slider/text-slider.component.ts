import { AfterContentChecked, Component } from '@angular/core';

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html',
  styleUrls: ['./text-slider.component.scss']
})

export class TextSliderComponent implements AfterContentChecked {

  index = 0;
  time = 400;
  slider: HTMLElement | undefined | null;
  loop = true;
  interval = this.createInterval();

  items: string[] = [
    'The Latest New For Your New Post',
    'The Latest New For Your',
    'The Latest New'
  ];

  constructor() { }

  ngAfterContentChecked(): void {
    this.slider = document.getElementById('slides');
  }

  public slide(value: number, clear = false): void {
    if (this.index + value < 0)
      this.set(this.items.length - 1, 800);
    else if (this.index + value >= this.items.length)
      this.set(0, 800);
    else
      this.set(this.index += value, 400);

    if (this.slider) {
      const style = this.slider.style;
      style.transition = `all ${this.time}ms 0`;
      style.transform = `translate3d(-${this.index * 228}px, 0, 0)`;
    }

    if (clear && this.interval) {
      window.clearInterval(this.interval);
    }
  }

  private set(
    index: number,
    time: number
  ): void {
    this.index = index;
    this.time = time;
  }

  private createInterval(): NodeJS.Timer {
    return setInterval(() => this.slide(1), 5000);
  }

}
