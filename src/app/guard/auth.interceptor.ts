import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HTTP_INTERCEPTORS,
	HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';

const TOKEN_HEADER_KEY =  'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: UserAuthService) { }
	

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

		let authReq = req;
		const token = this.authService.getToken()

		if (token != null) {
			authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, + 'Bearer ' + token)})

			
		}
		return next.handle(authReq);
	}
	
}

export const authInterceptorProviders = [{
	provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
}];
