
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngrx/store';
import { IUserType, saveUser } from '../store/user/user.actions';

const helper = new JwtHelperService();

type CustomUser = {
  user: IUserType
}

export class JwtTokenHelpers {

  constructor(
    private store: Store<{ user: IUserType }>
  ) {}

  public decodeToken = (token) => {

    const isExpired: boolean = helper.isTokenExpired(token);
    if(isExpired) return false;
    const {sub, address, name, cep} = helper.decodeToken(token);
    const user: CustomUser = {
      user: {
        isAuthenticated: true,
        email: sub,
        address: address,
        name: name,
        cep: cep,
      }
    }
    this.storeUserData(user);
    return true;
  }

  private storeUserData = (userToSave: CustomUser) => {
    this.store.dispatch(saveUser(userToSave));
  };
}


