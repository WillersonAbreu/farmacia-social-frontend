import { createAction, props } from '@ngrx/store';

export interface IUserType {
  id: number,
  roleId: number,
  isAuthenticated: boolean,
  address: string,
  cep: string,
  name: string,
  email: string
}

export const saveUser = createAction('[ User Page ] Store User', props<{ user: IUserType }>());
export const removeUser = createAction('[ User Page ] Remove User');
