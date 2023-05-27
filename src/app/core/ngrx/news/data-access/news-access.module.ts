import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { newsReducers } from '../../ngrx.index';
import { NewsEffects } from '../news.effects';
import { NewsFacade } from '../news.facade';
import { NewsService } from '@core/services/api/news.service';

@NgModule({
  imports: [
    StoreModule.forFeature('NewsState', newsReducers),
    EffectsModule.forFeature([
      NewsEffects
    ]),
  ],
  providers: [NewsFacade, NewsService]
})

export class NewsAccessModule { }