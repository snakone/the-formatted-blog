import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  constructor(private createDraftService: CreateDraftService) { }

  ngOnInit(): void { 
    this.id$ = this.createDraftService.onDraftDelete$;
  }

}
