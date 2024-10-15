import {createReducer, on} from "@ngrx/store";
import * as AuthenticationActions from './authentication.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthenticationActions.loginSuccessAction, (state, { response }) => {
    localStorage.setItem('authToken', response.token);

    console.log("Authentication success reducer", response);

    return {
      ...state,
      token: response.token,
      isAuthenticated: true,
      error: null,
    };
  }),
  on(AuthenticationActions.loginFailureAction, (state, { error }) => {
    return {
      ...state,
      error: error.message,
      isAuthenticated: false,
    };
  })
);
