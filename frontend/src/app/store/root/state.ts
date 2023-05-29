import { ErrorType } from 'src/app/types/error';

export const ROOT_FEATURE_KEY = 'root';

export interface State {
  readonly [ROOT_FEATURE_KEY]: RootState;
}

export interface RootState {
  appName: string;
  isDarkTheme: boolean;
  isLoading: boolean;
  error: ErrorType;
}

export const initialState: RootState = {
  appName: 'Handouceur',
  isDarkTheme: true,
  isLoading: false,
  error: null,
};
