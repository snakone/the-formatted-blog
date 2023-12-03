import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-index-skeleton',
  templateUrl: './post-index-skeleton.component.html',
  styleUrl: './post-index-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostIndexSkeletonComponent {
  items: {id: number, width: number}[] = [
    {id: 1, width: this.getRandomWidth()},
    {id: 2, width: this.getRandomWidth()},
    {id: 3, width: this.getRandomWidth()},
    {id: 4, width: this.getRandomWidth()},
    {id: 5, width: this.getRandomWidth()},
    {id: 6, width: this.getRandomWidth()},
    {id: 7, width: this.getRandomWidth()},
    {id: 8, width: this.getRandomWidth()}
  ] 

  private getRandomWidth(): number {
    return Math.floor(Math.random() * (250 - 100 + 1)) + 100;
  }
}
