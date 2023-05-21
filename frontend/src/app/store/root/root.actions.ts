import { props, createActionGroup } from '@ngrx/store';

export enum ActionTypes {
  ROOT_DARK_THEME = 'Set Dark Theme',
}

export const ROOT_ACTIONS = createActionGroup({
  source: 'Root',
  events: {
    [ActionTypes.ROOT_DARK_THEME]: props<{ isDarkTheme: boolean }>(),
  },
});
