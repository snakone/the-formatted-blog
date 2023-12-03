import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@shared/types/interface.post';
import { Subject } from 'rxjs';

const loadTime = 5000;

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostIndexComponent {

  @Input() post: Post;
  scrollSpy$ = new Subject<string>();

  constructor() { }

  ngAfterContentInit(): void {
    this.listenToScroll();
  }

  private listenToScroll(): void {
    setTimeout(() => {
      if (!this.post || !this.post.headers) { return; }
      const headers = document.querySelectorAll('h2');

      const handleIntersection = (entry: IntersectionObserverEntry): void => {
        if (!entry.isIntersecting) {
          return;
        }
        this.setID(entry.target.id);
      };

      try {
        const intersectionObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            handleIntersection(entry);
          }
        });

        headers.forEach((header: Element) => {
          intersectionObserver.observe(header);
        });
      } catch (error) {
        console.error(error);
      }
    }, loadTime);
  }

  public scroll(id: string): void {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  private setID(id: string): void {
    this.scrollSpy$.next(id)
  }

}
