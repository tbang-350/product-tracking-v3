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


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: UserAuthService) { }
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.authService.getToken();
		if (token) {
			request = request.clone({
				setHeaders: { Authorization: 'Bearer ' + token }
			});
		}
		 if (!request.headers.has('Content-Type')) {
		 	request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		 }
		// return next.handle(request).pipe(catchError(error => this.handleErrors(error,request,next)))
		return next.handle(request).pipe(catchError(error => {
		// /	console.log("asdfasdfas");
			// if (!request.url.includes('auth/signin') && error.status == 401) {
				if (error.status == 401) {
				// alert("asdfasdf");
				return this.handle401Error(request, next);
			}
			return throwError(error);
		}));

	}
	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		console.log("asdfasdf");
		return this.refreshTokenSubject.pipe(
			filter(token => token !== null),
			take(1),
			switchMap((token) => next.handle(this.addTokenHeader(request, token)))
		);
	}
	private addTokenHeader(request: HttpRequest<any>, token: string) {
		/* for Spring Boot back-end */
		return request.clone({ headers: request.headers.set("Authorization", 'Bearer ' + token) });
	}
}

export const authInterceptorProviders = [{
	provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
}];
