import {createAction, props} from "@ngrx/store";
import {RegisterRequestModel} from "../../authentication/models/register-request.model";
import {RegisterResponseModel} from "../../authentication/models/register-response.model";

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
