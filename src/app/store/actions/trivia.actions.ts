import { createAction, props } from '@ngrx/store';
import { Question } from '../models/question.model';

const getTriviaQuestions = createAction(
    '[Trivia] Get Trivia Questions',
);

const getTriviaQuestionsSuccess = createAction(
    '[Trivia] Get Trivia Questions Success',
    props<{ questions: Array<Question> }>()
);


const answerActiveTriviaQuestion = createAction(
    '[Trivia] Answer Trivia Question',
    props<{ answer: string }>()
);

const goToNextTriviaQuestion = createAction(
    '[Trivia] Go To Next Trivia Question',
);

const triviaComplete = createAction(
    '[Trivia] Trivia Complete',
);

export const TriviaActions = {
    getTriviaQuestions,
    getTriviaQuestionsSuccess,
    answerActiveTriviaQuestion,
    goToNextTriviaQuestion,
    triviaComplete
};
