import { Component, ChangeDetectionStrategy, Input, AfterContentInit } from '@angular/core';
import { Post } from '@shared/types/interface.types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostIndexComponent implements AfterContentInit {

  @Input() draft: Post;
  scrollSpy$ = new Subject<string>();

  constructor() { }

  ngAfterContentInit(): void {
    this.listenToScroll();
  }

  public scroll(id: string): void {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  private listenToScroll(): void {
    if (!this.draft.headers) { return; }
    setTimeout(() => {
      const headers = document.querySelectorAll('h2');
      try {
        const inter = new IntersectionObserver((int) => {
          if (!int[0].isIntersecting) { return; }
          this.setID(int[0].target.id);
        });
        headers.forEach((el: Element) => {
          inter.observe(el);
        });
      } catch (err) { console.log(err); }
    }, 2500);  // wait H2 to LOAD
  }

  private setID(id: string): void {
    this.scrollSpy$.next(id)
  }

}
