import { FormControl } from '@angular/forms';
import { Question } from './question.model';

export interface Trivia {
    readonly questions: Array<Question>;
    readonly score: number;
    readonly activeQuestion: number;
    readonly finished: boolean;
}
