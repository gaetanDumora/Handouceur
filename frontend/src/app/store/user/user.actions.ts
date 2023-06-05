import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { ErrorType } from 'src/app/types/error';
import { User, Credentials, RegisterInputs } from 'src/app/types/user';

export enum UserActionTypes {
  UPLOAD_IMAGES = 'Upload Images',
  UPLOAD_IMAGES_SUCCESS = 'Upload Images Success',
  UPLOAD_IMAGES_FAILURE = 'Upload Images Failure',

  DOWNLOAD_IMAGE = 'Download Image',
  DOWNLOAD_IMAGE_SUCCESS = 'Download Image Success',
  DOWNLOAD_IMAGE_FAILURE = 'Download Image Failure',

  DELETE_IMAGES = 'Delete Images',
  DELETE_IMAGES_SUCCESS = 'Delete Images Success',
  DELETE_IMAGES_FAILURE = 'Delete Images Failure',

  //TODO remove user prefix
  USER_SUBMIT_CREDENTIALS = 'Submit Credentials',
  USER_SUBMIT_CREDENTIALS_SUCCESS = 'Submit Credentials success',
  USER_SUBMIT_CREDENTIALS_FAILURE = 'Submit Credentials faillure',

  USER_LOGOUT = 'Logout User',
  USER_LOGIN = 'Login User',
}

export const USER_ACTIONS = createActionGroup({
  source: 'User',
  events: {
    [UserActionTypes.USER_SUBMIT_CREDENTIALS]: props<RegisterInputs>(),
    [UserActionTypes.USER_SUBMIT_CREDENTIALS_SUCCESS]: props<{
      user: User | null;
    }>(),
    [UserActionTypes.USER_SUBMIT_CREDENTIALS_FAILURE]: props<{
      error: ErrorType;
    }>(),
    [UserActionTypes.USER_LOGOUT]: emptyProps(),
    [UserActionTypes.USER_LOGIN]: props<Credentials>(),

    [UserActionTypes.UPLOAD_IMAGES]: props<{ image: FormData }>(),
    [UserActionTypes.UPLOAD_IMAGES_SUCCESS]: emptyProps(),
    [UserActionTypes.UPLOAD_IMAGES_FAILURE]: props<{ error: ErrorType }>(),

    [UserActionTypes.DOWNLOAD_IMAGE]: props<{ key: string }>(),
    [UserActionTypes.DOWNLOAD_IMAGE_SUCCESS]: emptyProps(),
    [UserActionTypes.DOWNLOAD_IMAGE_FAILURE]: props<{ error: ErrorType }>(),

    [UserActionTypes.DELETE_IMAGES]: props<{ image: string[] }>(),
    [UserActionTypes.DELETE_IMAGES_SUCCESS]: emptyProps(),
    [UserActionTypes.DELETE_IMAGES_FAILURE]: props<{ error: ErrorType }>(),
  },
});
