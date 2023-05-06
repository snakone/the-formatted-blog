import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateSidebarComponent implements OnInit {

  @Input() drafts!: Post[] | null;
  id$: Observable<string> | undefined;

  constructor(private createDraftService: CreateDraftService, private draftsFacade: DraftsFacade) { }

  ngOnInit(): void { 
    this.id$ = this.createDraftService.onDraftDelete$;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.drafts && this.drafts.length === 1) {
        this.draftsFacade.setActive(this.drafts[0]);
      }
    }, 999);
  }

}
