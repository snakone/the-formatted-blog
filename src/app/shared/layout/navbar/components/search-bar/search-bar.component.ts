import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  @Output() closed = new EventEmitter<void>();
  value = '';
  sentence = 'Escribe aquí lo que quieras buscar, artículos, vídeos, opiniones, etc...';
  placeholder = '';
  index = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.autoType();
  }

  public close(): void {
    const el = document.getElementById('search-bar');
    if (el) {
      this.renderer.removeClass(el, 'bounceInDown');
      this.renderer.addClass(el, 'bounceOutUp');

      setTimeout(() => {
        this.closed.emit();
      }, 800);
    }
  }

  private autoType(): void {
    setTimeout(() => {
      this.typing();
    }, 1000);
  }

  private typing(): void {
    if (this.index <= this.sentence.length) {
      this.placeholder = this.sentence.substr(0, this.index++);
      setTimeout(() => this.typing(), 30);
    }
  }

}
