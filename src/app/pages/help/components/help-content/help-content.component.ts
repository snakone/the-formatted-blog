import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FQA_ITEMS } from '@shared/data/data';

@Component({
  selector: 'app-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HelpContentComponent {

  items = FQA_ITEMS;
  trigger = false;

  ngOnInit() { }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

}
