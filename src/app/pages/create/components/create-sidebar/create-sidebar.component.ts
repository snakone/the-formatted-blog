import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { CreateDraftService } from '@pages/create/services/create-draft.service';
import { SavingType } from '@shared/types/interface.app';
import { Post } from '@shared/types/interface.post';
import { Observable, distinctUntilKeyChanged, filter } from 'rxjs';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class CreateSidebarComponent implements OnInit {

  @Input() drafts!: Post[] | null;
  id$: Observable<string> | undefined;
  saving$: Observable<SavingType> | undefined;
  isCollapsed = false;
  @Input() originalCollapsed: boolean;

  constructor(
    private createDraftService: CreateDraftService,
    private draftsFacade: DraftsFacade,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkCollapseResize();
    this.id$ = this.createDraftService.onDraftDelete$;
    this.saving$ = this.draftsFacade.saving$.pipe(
      filter(res => !!res), 
      distinctUntilKeyChanged('value')
    ); 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.drafts && this.drafts.length === 1 && this.drafts[0].status !== 'pending') {
        this.draftsFacade.setActive(this.drafts[0]);
      }
    }, 666);
  }

  public collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.createDraftService.onCollapse(this.isCollapsed);
  }

  private async checkCollapseResize(): Promise<void> {
    window.addEventListener('resize', async () => {
      if (document.body.clientWidth < 984) { 
        this.isCollapsed = false;
        this.changeRef.detectChanges();
      } else {
        this.isCollapsed = this.originalCollapsed;
        this.changeRef.detectChanges();
      }
    })
  }

}
