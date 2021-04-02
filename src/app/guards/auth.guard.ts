import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

/**
 * Auth guard to prevent unauthorized user to see restricted pages.
 */
@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    /**
     * Function that checks whether the current user has permission to activate the requested route.
     * @param route Initializes a component with route information extracted from the snapshot of the root node at the time of creation.
     * @param router Represents the state of the router at a moment in time.
     */
    public canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot,
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.getSignInStatus().pipe(
            first(),
            map(status => {
                const isSignedIn = !!status;
                if (isSignedIn) {
                    return true;
                }
                return this.router.createUrlTree(['/movies']);
            }),
        );
    }
}
