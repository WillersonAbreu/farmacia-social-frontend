import { createAction, props } from '@ngrx/store';

export interface IUserType {
  isAuthenticated: boolean,
  address: string,
  cep: string,
  name: string,
  email: string
}

export const saveUser = createAction('[ User Page ] Store User', props<{ user: IUserType }>());
export const removeUser = createAction('[ User Page ] Remove User');
