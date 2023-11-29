import { createAction, props } from "@ngrx/store";
import { UserActivity } from "@shared/types/interface.user";

// GET ACTIVITIES
export const get =
  createAction('[Activities API] Get Activities');

export const getSuccess =
  createAction('[Activities API] Get Activities Success',
  props<{ activities: UserActivity[] }>());

export const getFailure =
  createAction('[Activities API] Get Activities Failure',
  props<{ error: string }>());

// RESET ACTIVITIES
export const reset =
  createAction('[Activities API] Reset Activities');

// SET ACTIVITIES
export const setPublic =
  createAction('[Activities API] Set Public Activities',
  props<{ activities: UserActivity[] }>());