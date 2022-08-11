import { Injectable, Injector } from '@angular/core';
import {HttpEvent,HttpRequest,HttpHandler,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { LoaderService } from '../services/global/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({
      headers: req.headers.set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0')
    });
    if (!req.url.toLowerCase().includes('getpageflags') ) {
      const loaderService = this.injector.get(LoaderService);
      loaderService.show();
      return next.handle(req).pipe(
        delay(500),
        finalize(() => loaderService.hide())
      );
    } else {
      return next.handle(req);
    }
  }
}
