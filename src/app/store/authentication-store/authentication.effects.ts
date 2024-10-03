import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import * as AuthenticationActions from  "./authentication.actions";
import {catchError, exhaustMap, map, of} from "rxjs";
import {RegisterResponseModel} from "../../authentication/models/register-response.model";
import {AuthenticationService} from "../../authentication/services/authentication.service";

export const registerEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authenticationService: AuthenticationService = inject(AuthenticationService),
  ) => {
    return actions$.pipe(
      ofType(AuthenticationActions.registerRequestAction),
      exhaustMap((action) => {
        console.log("Register request sent:", action.registerRequest); // Log the request
        return authenticationService.register(action.registerRequest).pipe(
          map((response: RegisterResponseModel) => {
            console.log("Registration successful, response received:", response); // Log the response
            return AuthenticationActions.registerSuccessAction({ response }); // Dispatch success action
          }),
          catchError((error) => {
            console.error('Registration failed', error); // Log the error
            return of(AuthenticationActions.registerFailureAction({ error })); // Dispatch failure action
          })
        );
      })
    );
  },
  { functional: true }
);

