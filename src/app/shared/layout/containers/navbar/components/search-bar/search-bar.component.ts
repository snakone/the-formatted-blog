import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { BOUNCE_IN_DOWN_CLASS, BOUNCE_OUT_UP_CLASS } from '@shared/data/constants';
import { SEARCH_SENTENCE } from '@shared/data/sentences';

const typeDelay = 1000;
const closeDelay = 800;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  @Output() closed = new EventEmitter<void>();
  value = '';
  placeholder = '';
  index = 0;
  sentence = SEARCH_SENTENCE;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.autoType();
  }

  public search(): void {
    console.log(this.value);
    this.close();
  }

  public close(): void {
    const el = document.getElementById('search-bar') || null;
    if (el) {
      this.applyAnimationClasses(el);
      setTimeout(() => this.closed.emit(), closeDelay);
    }
  }

  private autoType(): void {
    setTimeout(() => this.typing(), typeDelay);
  }

  private typing(): void {
    if (this.index <= this.sentence.length) {
      this.placeholder = this.sentence.slice(0, this.index++);
      setTimeout(() => this.typing(), 30);
    }
  }

  private applyAnimationClasses(el: HTMLElement): void {
    this.renderer.removeClass(el, BOUNCE_IN_DOWN_CLASS);
    this.renderer.addClass(el, BOUNCE_OUT_UP_CLASS);
  }

}
