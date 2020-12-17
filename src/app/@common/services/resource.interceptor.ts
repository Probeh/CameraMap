import { Observable } from 'rxjs'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class ResourceInterceptor implements HttpInterceptor {
  // ======================================= //
  constructor() { }
  // ======================================= //

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dataset = `assets/rawdata/${req.url.split('/')[0]}.json`;
    const jsonUrl = req.url.replace(req.url.split('/')[0], dataset);
    const request = req.clone({ url: jsonUrl, responseType: 'json' });

    return next.handle(request);
  }
}