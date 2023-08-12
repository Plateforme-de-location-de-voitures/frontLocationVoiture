import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personne, Role } from '../models/users';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private isLoggedIn: boolean = false;
  public role: Role = new Role();
  public user: Personne = new Personne();
  url!: string;

  // construteur
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }


  // Récupérer la liste des rôles
  getRolesList(): Observable<Array<Role>> {
    return this.httpClient.get<Array<Role>>(this.url +'roles');
  }

  // Récupérer les détails d'un rôle en utilisant l'id
  getRoleDetail(roleId: number): Observable<Role> {
    return this.httpClient.get<Role>(this.url + 'role/' + roleId);
  }

  // Enregistrement d'un nouvel utilisateur
  registerUser(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.url + 'register', userData);
  }

  // Connexion de l'utilisateur
  loginUser(userData: any): Observable<any> {
    return this.httpClient.post(this.url + 'login', userData);
  }

  // Récupérer les informations de l'utilisateur actuellement connecté
  getCurrentUser(): Observable<Personne> {
    this.isLoggedIn = true;
    return this.httpClient.get<Personne>(this.url + 'user', {withCredentials:true});
  }

  // Vérifie si l'utilisateur est connecté
  isUserLoggedIn(): boolean {
    return this.isLoggedIn = true;
  }

  // Déconnexion de l'utilisateur
  logoutUser(): Observable<any> {
    this.isLoggedIn = false
    return this.httpClient.post(this.url + 'logout', {withCredentials:true});
  }
}
