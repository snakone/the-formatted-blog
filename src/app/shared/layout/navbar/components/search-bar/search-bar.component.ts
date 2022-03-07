import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { SEARCH_SENTENCE } from '@shared/data/sentences';

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
      this.renderer.removeClass(el, 'bounceInDown');
      this.renderer.addClass(el, 'bounceOutUp');
      setTimeout(() => this.closed.emit(), 800);
    }
  }

  private autoType(): void {
    setTimeout(() => this.typing(), 1000);
  }

  private typing(): void {
    if (this.index <= this.sentence.length) {
      this.placeholder = this.sentence.slice(0, this.index++);
      setTimeout(() => this.typing(), 30);
    }
  }

}
