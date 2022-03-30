import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { Trivia } from '../models/trivia.model';
​
export const getTriviaState = createFeatureSelector<AppState, Trivia>('trivia');
​
export const getQuestions = createSelector(
    getTriviaState,
    (state: Trivia) => state.questions
);

export const getFinished = createSelector(
    getTriviaState,
    (state: Trivia) => state.finished
);

export const getScore = createSelector(
    getTriviaState,
    (state: Trivia) => state.score
);

export const getActiveQuestion = createSelector(
    getTriviaState,
    (state: Trivia) => state.questions[state.activeQuestion]
);

