import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import { MovieState } from '../state/movie.state';
import * as movie from './movie.reducers';

export interface State {
    [movie.movieFeatureKey]: MovieState;
}

export const rootReducers: ActionReducerMap<State> = {
    [movie.movieFeatureKey]: movie.reducer
};