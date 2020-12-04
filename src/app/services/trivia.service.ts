import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from '../store/models/question.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(
    private http: HttpClient
  ) { }

  public getTriviaQuestions(): Observable<Array<Question>> {
    const payload = {
      amount: '10',
      type: 'multiple',
      encode: 'base64'
    };
    return this.http.get(this.apiUrl, { params: payload }).pipe(
      map((response: any) => {
        // Unfortuantly due to the API we have to do some horrible decoding and mushing of data here.
        return response.results.map((x: any) => {
          return {
            id: uuid.v4(),
            question: atob(x.question),
            category: atob(x.category),
            type: atob(x.type),
            difficulty: atob(x.difficulty),
            correctChoice: atob(x.correct_answer),
            choices: [...x.incorrect_answers.map((y: string) => atob(y)), atob(x.correct_answer)].sort( () => .5 - Math.random() ),
          };
        });
      })
    );
  }
}
