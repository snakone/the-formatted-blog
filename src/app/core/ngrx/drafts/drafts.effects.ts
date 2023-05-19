import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as DraftsActions from './drafts.actions';
import * as PostsActions from '../posts/posts.actions';
import { map, concatMap, catchError, withLatestFrom, filter, throttleTime, debounceTime, tap, switchMap } from 'rxjs/operators';
import { DraftService } from '@core/services/api/drafts.service';
import * as fromDrafts from './drafts.selectors';
import { Store } from '@ngrx/store';
import { DraftsState } from './drafts.reducer';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { CreateDraftService } from '@pages/create/services/create-draft.service';

@Injectable()

export class DraftsEffects {

  constructor(
    private actions: Actions,
    private draftSrv: DraftService,
    private store: Store<DraftsState>,
    private crafter: CrafterService,
    private createDraftSrv: CreateDraftService
  ) { }

  // GET DRAFTS
  loadDraftsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.getByUser),
      concatMap(() =>
      this.draftSrv.get()
        .pipe(
          map(drafts => DraftsActions.getByUserSuccess({ drafts })),
          catchError(error =>
              of(DraftsActions.getByUserFailure({ error: error.message }))
    ))))
  );

  // GET ALL DRAFTS
  loadAllDraftsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.getAll),
      concatMap(() =>
      this.draftSrv.getAll()
        .pipe(
          map(drafts => DraftsActions.getAllSuccess({ drafts })),
          catchError(error =>
              of(DraftsActions.getAllFailure({ error: error.message }))
    ))))
  );

  // GET DRAFT BY SLUG
  loadDraftBySlugEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.getBySlug),
      concatMap((action) =>
      this.draftSrv.getBySlug(action.slug)
        .pipe(
          map(draft => DraftsActions.getBySlugSuccess({ draft })),
          catchError(error =>
              of(DraftsActions.getBySlugFailure({ error: error.message }))
    ))))
  );

  // CREATE DRAFT
  createDraftsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.create),
      withLatestFrom(this.store.select(fromDrafts.getActive)),
      filter(([_, active]) => !active),
      concatMap(([action]) =>
      this.draftSrv.createDraft(action.draft)
        .pipe(
          map(draft => DraftsActions.createSuccess({ draft })),
          catchError(error =>
              of(DraftsActions.createFailure({ error: error.message }))
    ))))
  );

  // UPDATE DRAFT
  updateDraftEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.update),
      withLatestFrom(this.store.select(fromDrafts.getActive)),
      filter(([_, active]) => !!active),
      concatMap(([action]) =>
      this.draftSrv.updateDraft(action.draft)
        .pipe(
          map(draft => DraftsActions.updateSuccess({ draft })),
          catchError(error =>
              of(DraftsActions.updateFailure({ error: error.message }))
    ))))
  );

  // UPDATE DRAFT KEY
  updateDraftKeyEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.updateKey),
      concatMap((action) =>
      this.draftSrv.updateDraftKey(action.id, {...action.keys})
        .pipe(
          map(draft => DraftsActions.updateKeySuccess({ draft, toast: action.toast })),
          catchError(error =>
              of(DraftsActions.updateKeyFailure({ error: error.message }))
    ))))
  );

  // DELETE DRAFT 
  deleteDraftEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.deleteDraft),
      debounceTime(600), // Delete Animation
      concatMap((action) =>
      this.draftSrv.deleteDraft(action.id)
        .pipe(
          map(_ => DraftsActions.deleteSuccess({ id: action.id })),
          catchError(error =>
              of(DraftsActions.deleteFailure({ error: error.message }))
    ))))
  );

  // PUBLISH DRAFT
  publishDraftsEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.publish),
      concatMap((action) =>
      this.draftSrv.publishDraft(action.draft)
        .pipe(
          map(draft => DraftsActions.publishSuccess({ draft })),
          catchError(error =>
              of(DraftsActions.publishFailure({ error: error.message }))
    ))))
  );

  onDraftUpdateEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(...[
        DraftsActions.updateSuccess,
        DraftsActions.updateKeySuccess,
      ]),
      concatMap((_) => of(...[
        DraftsActions.getByUser(),
        DraftsActions.getAll(),
        DraftsActions.setActive({draft: _?.draft})
      ])),
      catchError(error =>
        of(DraftsActions.deleteFailure({ error: error.message }))
      ))
  )

  // ALERT DRAFTS
  alertsDraftEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.createSuccess),
      concatMap((_) => of(this.crafter.setSnack('Boceto creado!', 'success')))
    ), { dispatch: false }
  )

  alertsDraft1Effect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.deleteSuccess),
      concatMap((_) => of(this.crafter.setSnack('Boceto borrado!', 'success')))
    ), { dispatch: false }
  )

  alertsDraft2Effect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.updateSuccess),
      concatMap((_) => of(this.crafter.setSnack('Boceto actualizado!', 'success')))
    ), { dispatch: false }
  )

  alertsDraft3Effect$ = createEffect(() => this.actions
  .pipe(
    ofType(DraftsActions.updateKeySuccess),
    filter(_ => _.toast),
    concatMap((_) => of(this.crafter.setSnack('Boceto actualizado!', 'success')))
    ), { dispatch: false }
  )

  // ON COLLAPSE CREATE
  removeCollapsedEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.deleteSuccess),
      withLatestFrom(this.store.select(fromDrafts.get)),
      filter(([_, drafts]) => drafts.length === 0),
      concatMap((_) => of(this.createDraftSrv.onCollapse(false)))
    ), { dispatch: false }
  )

  onPublishDraftEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(DraftsActions.publishSuccess),
      tap(_ => this.crafter.setSnack('Boceto publicado!', 'success')),
      switchMap((_) => of(...[
        DraftsActions.reset(),
        PostsActions.reset()
      ]))
    )
  )

}