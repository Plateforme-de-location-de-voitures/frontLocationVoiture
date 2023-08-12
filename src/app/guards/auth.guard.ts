import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UsersService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isUserLoggedIn() === true ) {
      return true;
    } else {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
