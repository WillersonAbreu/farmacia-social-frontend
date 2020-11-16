import { Action, createReducer, on } from '@ngrx/store';

import * as TokenActions from './auth.actions';

export interface IState {
  token: string;
}

export const initialState: IState = {
  token: ''
};
const _authReducer = createReducer(
  initialState,
  on(TokenActions.saveToken, (state, { token }) => ({...state, token: token})),
  on(TokenActions.removeToken, (state) => ({...state, token: ''})),
);

export function authReducer(state: IState, action: Action) {
  return _authReducer(state, action);
}
