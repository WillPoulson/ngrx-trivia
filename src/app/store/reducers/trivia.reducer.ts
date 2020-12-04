import { Action, createReducer, on } from '@ngrx/store';
import { Trivia } from '../models/trivia.model';
import { TriviaActions } from '../actions/trivia.actions';
import { FormControl, Validators } from '@angular/forms';

export const initialState: Trivia = {
    questions: [],
    activeQuestion: 0,
    score: 0,
    finished: false,
};

const triviaReducerFn = createReducer(
    initialState,
    on(TriviaActions.getTriviaQuestionsSuccess, (state, { questions }) => {
        return {
            ...state,
            questions,
            activeQuestion: 0
        };
    }),
    on(TriviaActions.answerActiveTriviaQuestion, (state, {answer}) => {
        const question = state.questions[state.activeQuestion];
        const correct = question.correctChoice === answer;
        let newScore = state.score;
        if (correct) {
            newScore++;
        }
        return {
            ...state,
            questions: [
                ...state.questions.slice(0, state.activeQuestion),
                {
                    ...state.questions[state.activeQuestion],
                    answer,
                },
                ...state.questions.slice(state.activeQuestion + 1)
            ],
            score: newScore
        };
    }),
    on(TriviaActions.goToNextTriviaQuestion, (state) => {
        const max = state.questions.length - 1;
        const next = state.activeQuestion + 1;

        if (next > max) {
            return state;
        }

        return {
            ...state,
            activeQuestion: next
        };
    }),
    on(TriviaActions.triviaComplete, (state) => {
        return {
            ...state,
            finished: true
        };
    }),
);

export function triviaReducer(state: Trivia | undefined, action: Action): Trivia | undefined {
    return triviaReducerFn(state, action);
}
