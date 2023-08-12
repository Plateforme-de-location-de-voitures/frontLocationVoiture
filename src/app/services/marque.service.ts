import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Voiture } from '../models/voiture';
import { Marque } from '../models/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  url!: string;

  // construteur
  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  // Récupérer la liste des marques
  getMarquesList(): Observable<Array<Marque>> {
    return this.httpClient.get<Array<Marque>>(this.url + 'marques');
  }

  // Créer une nouvelle marque
  createMarque(marqueData: Marque): Observable<Marque> {
    return this.httpClient.post<Marque>(this.url + 'marque/create', marqueData);
  }

  // Mettre à jour une marque existante
  updateMarque(marqueId: number, marqueData: Marque): Observable<Marque> {
    return this.httpClient.put<Marque>(this.url + 'marque/update/' + marqueId, marqueData);
  }

  // Supprimer une marque en utilisant l'id
  deleteMarque(marqueId: number): Observable<any> {
    return this.httpClient.delete(this.url + 'marque/delete/' + marqueId);
  }
}
