import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityItem } from './activityItem';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private boredApiUrl = 'http://www.boredapi.com/api/activity/';  // URL to web api
  private APIUrl = "https://localhost:5001/ActivityItem";
  


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Activity from the server */
  getActivityItem(): Observable<ActivityItem> {
    return this.http.get<ActivityItem>(this.boredApiUrl)
      .pipe(
        tap(_ => this.log('fetched Activity')),        
        catchError(this.handleError<ActivityItem>('getActivityItem'))
      );
  }

    /** Log a ActivityService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`ActivityService: ${message}`);
    }
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    getAPIActivityItems(): Observable<ActivityItem[]> {
      return this.http.get<ActivityItem[]>(this.APIUrl)
        .pipe(
          tap(_ => this.log('fetched API Activity Items')),        
          catchError(this.handleError<ActivityItem[]>('getAPIActivityItems', []))
        );
    }

    postAPIActivityItem(activityItem: ActivityItem): Observable<ActivityItem>{      
      return this.http.post<ActivityItem>(this.APIUrl, activityItem);
    }

    deleteAPIActivityItems(activityItemKeys: number[]): Observable<ActivityItem[]>{      
      var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: activityItemKeys
      };      
      return this.http.delete<ActivityItem[]>(this.APIUrl, httpOptions);
    }
}
