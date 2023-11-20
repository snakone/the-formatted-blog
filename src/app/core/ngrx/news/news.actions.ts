import { createAction, props } from "@ngrx/store";
import { FormattedNew } from "@shared/types/interface.app";

// GET NEWS
export const get =
  createAction('[News API] Get News');

export const getSuccess =
  createAction('[News API] Get News Success',
  props<{ news: FormattedNew[] }>());

export const getFailure =
  createAction('[News API] Get News Failure',
  props<{ error: string }>());