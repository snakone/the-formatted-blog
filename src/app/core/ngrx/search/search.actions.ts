import { createAction, props } from "@ngrx/store";
import { SearchResult } from "@shared/types/interface.user";

// SEARCH
export const fullSearch =
  createAction('[Search API] Do a Search',
  props<{ value: string}>());

export const fullSearchSuccess =
  createAction('[Search API] Do a Search Success',
  props<{ result: SearchResult, value: string }>());

export const fullSearchFailure =
  createAction('[[Search API] Do a Search Failure',
  props<{ error: string }>());

// RESET
export const reset =
  createAction('[Search API] Reset Search');