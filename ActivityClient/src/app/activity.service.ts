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

  private boredApiUrl = 'http://www.boredapi.com/api/activity/';  // URL to Bored Activity Web Api
  private APIUrl = 'https://localhost:5001/ActivityItem'; // URL to Web Api
  
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

  private log(message: string) {
    this.messageService.add(`ActivityService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAPIActivityItems(): Observable<ActivityItem[]> {
    return this.http.get<ActivityItem[]>(this.APIUrl)
      .pipe(
        tap(_ => this.log('Get API Activity Items')),        
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
