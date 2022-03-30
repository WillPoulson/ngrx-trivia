import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TriviaActions } from '../actions/trivia.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';

@Injectable()
export class TriviaEffects {
    constructor(
        private actions$: Actions,
        private state: Store<AppState>,
        private triviaService: TriviaService
    ) {}

    $getTriviaQuestionsFromApi = createEffect(() =>
        this.actions$.pipe(
            ofType(TriviaActions.getTriviaQuestions),
            switchMap(() => {
                return this.triviaService.getTriviaQuestions().pipe(
                    map((questions) => TriviaActions.getTriviaQuestionsSuccess({ questions }))
                );
            })
        )
    );

    $goToNextQuestion = createEffect(() =>
        this.actions$.pipe(
            ofType(TriviaActions.answerActiveTriviaQuestion),
            map(() => TriviaActions.goToNextTriviaQuestion())
        )
    );

    $finishTrivia = createEffect(() =>
        this.actions$.pipe(
            ofType(TriviaActions.goToNextTriviaQuestion),
            withLatestFrom(this.state.select(x => x.trivia)),
            filter(([action, state]) => state.activeQuestion === (state.questions.length - 1)),
            map(() => TriviaActions.triviaComplete())
        )
    );
}
