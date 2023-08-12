import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Voiture } from '../models/voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  formData: FormData = new FormData();
  public voiture: Voiture = new Voiture();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  // Récupérer la liste des voitures
  getVoituresList(): Observable<Array<Voiture>> {
    return this.httpClient.get<Array<Voiture>>(this.url + 'voitures');
  }

  // Recupérer la liste des voitures par Propriétaire
  getVoitureListByProprietaire(id: number): Observable<Array<Voiture>> {
    return this.httpClient.get<Array<Voiture>>(this.url + 'voitures/proprietaire/' + id)
  }

  // Récupérer les détails d'une voiture en utilisant son ID
  getVoitureDetail(voitureId: number): Observable<Voiture> {
    return this.httpClient.get<Voiture>(this.url + 'voiture/' + voitureId);
  }

  // Recherche de voitures par marque
  searchVoituresByMarque(marque: string): Observable<Array<Voiture>> {
    return this.httpClient.get<Array<Voiture>>(this.url + 'recherche/voitures-par-marque/' + marque);
  }

  // Créer une nouvelle voiture
  createVoiture(voitureData: FormData): Observable<Voiture> {
    return this.httpClient.post<Voiture>(this.url + 'voiture/create', voitureData);
  }

  // Mettre à jour une voiture existante
  updateVoiture(voitureId: number, voitureData: FormData): Observable<Voiture> {
    return this.httpClient.put<Voiture>(this.url + 'voiture/update/' + voitureId, voitureData);
  }

  // Supprimer une voiture en utilisant son ID
  deleteVoiture(voitureId: number): Observable<any> {
    return this.httpClient.delete(this.url + 'voiture/delete/' + voitureId);
  }
}
