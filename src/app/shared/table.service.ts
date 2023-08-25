import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../table/post/post.model';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  loading: boolean = false;
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }

  getPosts() {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((el) => {
        return el.reduce((acc: Array<IPost[]>, curr) => {
          let key = curr.userId;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(curr);
          return acc;
        }, []);
      }),
      map((el) => el.filter((el) => el))
    );

    // return this.http
    //   .get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
    //   .pipe(
    //     map((el) => {
    //       return el.reduce((acc: Array<IPost[]>, curr) => {
    //         let key = curr.userId;
    //         if (!acc[key]) {
    //           acc[key] = [];
    //         }
    //         acc[key].push(curr);
    //         return acc;
    //       }, []);
    //     }),
    //     debounceTime(15000),
    //     map((el) => el.filter((el) => el))
    //   );
  }
}
