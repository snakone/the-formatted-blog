import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as DraftsActions from './drafts.actions';
import { map, concatMap, catchError, withLatestFrom, filter, throttleTime, debounceTime } from 'rxjs/operators';
import { DraftService } from '@core/services/api/drafts.service';
import * as fromDrafts from './drafts.selectors';
import { Store } from '@ngrx/store';
import { DraftsState } from './drafts.reducer';
import { CrafterService } from '@core/services/crafter/crafter.service';

@Injectable()

export class DraftsEffects {

  constructor(
    private actions: Actions,
    private draftSrv: DraftService,
    private store: Store<DraftsState>,
    private crafter: CrafterService
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
      withLatestFrom(this.store.select(fromDrafts.getActive)),
      filter(([_, active]) => !!active),
      concatMap(([action]) =>
      this.draftSrv.updateDraftKey(action.id, {...action.keys})
        .pipe(
          map(draft => DraftsActions.updateKeySuccess({ draft })),
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

  onDraftUpdateEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(...[
        DraftsActions.updateSuccess,
        DraftsActions.updateKeySuccess,
      ]),
      concatMap((_) => of(DraftsActions.getByUser())),
      catchError(error =>
        of(DraftsActions.getByUserFailure({ error: error.message }))
      ))
  )

}