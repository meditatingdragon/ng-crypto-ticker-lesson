import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

const API_URL = 'https://api.cryptonator.com/api/ticker/';

class Ticker {
  base;
  target;
  price;
  volume;
  timestamp;
  change;
  
  constructor(ticker:any) {
    this.base = ticker.base;
    this.target = ticker.target;
    this.price = ticker.price;
    this.volume = ticker.volume;
    this.change = ticker.change;
    this.timestamp = new Date();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency:string, compareRate:string):Observable<any>  {
    let exchange = baseCurrency  +  '-' + compareRate;
    let apiURL = `${API_URL}/${exchange}`;
    return this.http.get<any>(apiURL)
        .pipe(
          map( (result) => {
            if (result.ticker) {
              return new Ticker(result.ticker);
            }
          }),
          catchError(this.handleError<Ticker>('getExchangeRates', new Ticker({})))
        );
    }

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
