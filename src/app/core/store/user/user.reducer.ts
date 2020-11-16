import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';
import { IUserType } from './user.actions';

export const initialState: IUserType = {
  isAuthenticated: false,
  address: '',
  cep: '',
  name: '',
  email: ''
};

const _userReducer = createReducer(
  initialState,

  on(UserActions.saveUser, (state, { user }) => ({
    ...state,
    ...user,
    isAuthenticated: true,
    address: user.address,
    cep: user.cep,
    name: user.name,
    email: user.email
  })),

  on(UserActions.removeUser, (state) => ({
    ...state,
    isAuthenticated: false,
    address: '',
    cep: '',
    name: '',
    email: ''
  })),
);

export function userReducer(state: IUserType, action: Action) {
  return _userReducer(state, action);
}
