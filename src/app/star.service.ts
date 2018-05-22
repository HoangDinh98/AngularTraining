import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Star } from './star';
import { STARS } from './mock-stars';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable( )

export class StarService {

  private starsUrl = 'https://5aebce23046d7b0014fb6e75.mockapi.io/stars';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {

  }



  // getStars(): Observable<Star[]> {
  //   return of(STARS);
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StarService: ' + message);
  }

  /** GET heroes from the server */
  getStars(): Observable<Star[]> {
    return this.http.get<Star[]>(this.starsUrl)
      .pipe(
      tap(star => this.log(`fetched stars`)),
      catchError(this.handleError('getStars', []))
      );
  }

  // getStar(id: number): Observable<Star> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`StarService: fetched star id=${id}`);
  //   return of(STARS.find(star => star.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
  getStar(id: number): Observable<Star> {
    const url = `${this.starsUrl}/${id}`;
    return this.http.get<Star>(url).pipe(
      tap(_ => this.log(`fetched star id=${id}`)),
      catchError(this.handleError<Star>(`getStar id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateStar(star: Star): Observable<any> {
    const id = typeof star === 'number' ? star : star.id;
    const url = `${this.starsUrl}/${id}`;

    return this.http.put(url, star, httpOptions).pipe(
      tap(_ => this.log(`updated star id=${star.id}`)),
      catchError(this.handleError<any>('updateStar'))
    );
  }

  /** POST: add a new hero to the server */
  addStar(star: Star): Observable<Star> {
    return this.http.post<Star>(this.starsUrl, star, httpOptions).pipe(
      tap((star: Star) => this.log(`added star w/ id=${star.id}`)),
      catchError(this.handleError<Star>('addStar'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteStar(star: Star | number): Observable<Star> {
    const id = typeof star === 'number' ? star : star.id;
    const url = `${this.starsUrl}/${id}`;

    return this.http.delete<Star>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted star id=${id}`)),
      catchError(this.handleError<Star>('deleteStar'))
    );
  }


  /* GET heroes whose name contains search term */
  searchStars(term: string): Observable<Star[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // return this.http.get<Star[]>(`api/stars/?name=${term}`).pipe(
    //   tap(_ => this.log(`found star matching "${term}"`)),
    //   catchError(this.handleError<Star[]>('searchStars', []))
    // );

    // SEARCH TRUE KEYWORD
    // return this.http.get<Star[]>(`http://5aebce23046d7b0014fb6e75.mockapi.io/stars?search=${term}`).pipe(
    //   tap(_ => this.log(`found star matching "${term}"`)),
    //   catchError(this.handleError<Star[]>('searchStars', []))
    // );

    // SEARCH FULL TEXT
    // return this.http.get<Star[]>(`http://5aebce23046d7b0014fb6e75.mockapi.io/stars?filter=${term}`).pipe(
    //   tap(_ => this.log(`found star matching "${term}"`)),
    //   catchError(this.handleError<Star[]>('searchStars', []))
    // );

    // SEARCH FULL TEXT
    return this.http.get<Star[]>(`${this.starsUrl}?filter=${term}`).pipe(
      tap(_ => this.log(`found star matching "${term}"`)),
      catchError(this.handleError<Star[]>('searchStars', []))
    );
  }

}
