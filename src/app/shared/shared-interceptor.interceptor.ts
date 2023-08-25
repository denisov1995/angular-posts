import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TableService } from './table.service';

@Injectable()
export class SharedInterceptorInterceptor implements HttpInterceptor {

  constructor(private tableService: TableService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.tableService.showLoader();
    return next.handle(request).pipe(
      finalize(() => this.tableService.hideLoader())
    );
  }
}
