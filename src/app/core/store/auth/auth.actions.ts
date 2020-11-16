import { createAction, props } from '@ngrx/store';

export const saveToken = createAction('[ Token Page ] Store Token', props<{ token: string }>());
export const removeToken = createAction('[ Token Page ] Remove Token');
