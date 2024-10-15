import {createAction, props} from "@ngrx/store";
import {RegisterRequestModel} from "../../authentication/models/register-request.model";
import {RegisterResponseModel} from "../../authentication/models/register-response.model";
import {LoginRequestModel} from "../../authentication/models/login-request.model";
import {LoginResponseModel} from "../../authentication/models/login-response.model";

export const registerRequestAction = createAction(
  '[Authentication] Register Request',
  props<{ registerRequest: RegisterRequestModel }>()
);

export const registerSuccessAction = createAction(
  '[Authentication] Register Success',
  props<{ response: RegisterResponseModel }>()
);

export const registerFailureAction = createAction(
  '[Authentication] Register Failure',
  props<{ error: any }>()
);

export const loginRequestAction = createAction(
  '[Authentication] Login Request',
  props<{ loginRequest: LoginRequestModel }>()
);

export const loginSuccessAction = createAction(
  '[Authentication] Login Success',
  props<{ response: LoginResponseModel }>()
);

export const loginFailureAction = createAction(
  '[Authentication] Login Failure',
  props<{ error: any }>()
);

