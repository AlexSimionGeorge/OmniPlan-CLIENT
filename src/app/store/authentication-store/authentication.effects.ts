import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import * as AuthenticationActions from  "./authentication.actions";
import {catchError, exhaustMap, map, of} from "rxjs";
import {RegisterResponseModel} from "../../authentication/models/register-response.model";
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {LoginResponseModel} from "../../authentication/models/login-response.model";

export const registerEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authenticationService: AuthenticationService = inject(AuthenticationService),
  ) => {
    return actions$.pipe(
      ofType(AuthenticationActions.registerRequestAction),
      exhaustMap((action) => {
        return authenticationService.register(action.registerRequest).pipe(
          map((response: RegisterResponseModel) => {
            console.log("Registration successful, response received:", response);
            return AuthenticationActions.registerSuccessAction({ response });
          }),
          catchError((error) => {
            console.error('Registration failed', error); // Log the error
            return of(AuthenticationActions.registerFailureAction({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const loginEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authenticationService: AuthenticationService = inject(AuthenticationService),
  ) => {
    return actions$.pipe(
      ofType(AuthenticationActions.loginRequestAction),
      exhaustMap((action) => {
        return authenticationService.login(action.loginRequest).pipe(
          map((response: LoginResponseModel) => {
            return AuthenticationActions.loginSuccessAction({ response });
          }),
          catchError((error) => {
            return of(AuthenticationActions.loginFailureAction({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

