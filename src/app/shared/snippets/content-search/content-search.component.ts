import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { FilterType } from '@shared/types/interface.app';
import { SearchType, DraftStatus, DraftStatusEnum, SearchTypeEnum } from '@shared/types/types.enums';
import { KEYUP_EVENT } from '@shared/data/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SEARCH_DEFAULT_PLACEHOLDER } from '@shared/data/data';
import { UsersFacade } from '@core/ngrx/users/users.facade';

@Component({
  selector: 'app-content-search',
  templateUrl: './content-search.component.html',
  styleUrls: ['./content-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContentSearchComponent {

  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type: SearchType;
  @Input() placeholder: string = SEARCH_DEFAULT_PLACEHOLDER;

  switchSearch: {[key: string]: DraftStatus} = {
    'pendiente': DraftStatusEnum.PENDING,
    'visto': DraftStatusEnum.SEEN,
    'no visto': DraftStatusEnum.NOT_SEEN
  };

  constructor(
    private postFacade: PostsFacade,
    private destroyRef: DestroyRef,
    private userFacade: UsersFacade
  ) { }

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.input.nativeElement, KEYUP_EVENT).
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(100),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
     ).subscribe((value: string) => this.createFilter(value))
  }

  private createFilter(value: string): void {
    switch (this.type) {
      case SearchTypeEnum.FRIENDS: {
        this.userFacade.setFilter(this.userFilter(value));
        break;
      }
      default: {
        this.postFacade.setFilter(this.postFilter(value));
      }
    }
  }

  private postFilter(value: string): FilterType {
    return {
      title: value,
      category: value,
      author: value,
      status: this.convertStatus(value),
      type: this.type
    };
  }
  
  private userFilter(value: string): FilterType {
    return {
      name: value,
      email: value,
      location: value,
      role: value,
      type: this.type
    };
  }

  private convertStatus(value: string): DraftStatus {
    return this.switchSearch[(value || '').toLowerCase().trim()];
  }

}

