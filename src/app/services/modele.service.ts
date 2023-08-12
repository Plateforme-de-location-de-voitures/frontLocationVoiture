import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modele } from '../models/modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  url!: string;

  // construteur
  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  // Récupérer la liste des modèles
  getModelesList(): Observable<Array<Modele>> {
    return this.httpClient.get<Array<Modele>>(this.url + 'modeles');
  }

  // Créer un nouveau modèle
  createModele(modeleData: Modele): Observable<Modele> {
    return this.httpClient.post<Modele>(this.url + 'modele/create', modeleData);
  }

  // Mettre à jour un modèle existant
  updateModele(modeleId: number, modeleData: Modele): Observable<Modele> {
    return this.httpClient.put<Modele>(this.url + 'modele/update/' + modeleId, modeleData);
  }

  // Supprimer un modèle en utilisant son ID
  deleteModele(modeleId: number): Observable<any> {
    return this.httpClient.delete(this.url + 'modele/delete/' + modeleId);
  }
}
