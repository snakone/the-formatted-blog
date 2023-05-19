import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CHECKSTATUS } from '@shared/data/data';
import { CheckStatus, Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-draft-sidebar',
  templateUrl: './draft-sidebar.component.html',
  styleUrls: ['./draft-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class DraftSidebarComponent {

  @Input() draft: Post;
  check: CheckStatus[] = [];
  status = CHECKSTATUS;
  progress: number;

  ngAfterContentInit() {
    this.check = Object.values(this.draft?.check);
    this.calculateProgress();
  }

  private calculateProgress(): void {
    let total = 0;

    this.check.forEach((c: CheckStatus) => {
      if (c.ok) {
        total++;
      }
    });

    this.progress = Math.round((total / this.check.length) * 100);

    if (this.check.length !== (this.status.length + 1)) {
      console.warn('Warning, make sure `check` and `status` have the same length.');
    }
  }

}
