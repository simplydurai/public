import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'api/posts';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getDataById(database: string, id?: number): Observable<any> {
    const url = id ? `api/${database}/${id}` : `api/${database}`;
    return this.http
      .get<any>(url)
      .pipe(
        catchError(this.handleError(`Error getting data from ${database}`, []))
      );
  }

  getByTagName(database: string, tagname?: string): Observable<any> {
    const url = tagname ? `api/${database}/${tagname}` : `api/${database}`;
    return this.http
      .get<any>(url)
      .pipe(
        catchError(this.handleError(`Error getting data from ${database}`, []))
      );
  }
}
