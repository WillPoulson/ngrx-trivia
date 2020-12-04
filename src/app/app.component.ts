import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TriviaActions } from './store/actions/trivia.actions';
import { AppState } from './store/models/app-state.model';
import { Question } from './store/models/question.model';
import { getActiveQuestion, getFinished, getQuestions, getScore } from './store/selectors/trivia.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public questions$: Observable<Array<Question>> | undefined;
  public activeQuestion$: Observable<Question> | undefined;
  public score$: Observable<number> | undefined;
  public finished$: Observable<boolean> | undefined;

  constructor(
    private state: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.questions$ = this.state.select(getQuestions);
    this.activeQuestion$ = this.state.select(getActiveQuestion);
    this.score$ = this.state.select(getScore);
    this.finished$ = this.state.select(getFinished);
  }

  public dispatchAnswerActiveTriviaQuestion(answer: string): void {
    this.state.dispatch(TriviaActions.answerActiveTriviaQuestion({answer}));
  }

  public dispatchGetTriviaQuestions(): void {
    this.state.dispatch(TriviaActions.getTriviaQuestions());
  }

}
