import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchResult } from '@shared/types/interface.user';

@Component({
  selector: 'app-searh-content',
  templateUrl: './searh-content.component.html',
  styleUrl: './searh-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearhContentComponent {

  @Input() result: SearchResult;
  @Input() value: string = '';
  @Input() favorites: string[] = [];

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 3000);
  }

}
