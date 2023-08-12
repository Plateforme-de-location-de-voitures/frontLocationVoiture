import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageVoitureService {

  url!: string;

  // construteur
  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  // Récupérer la liste d'images de voitures
  getImageVoitureList(): Observable<any> {
    return this.httpClient.get(this.url + 'images/voitures');
  }

  // Récupérer les images d'une voiture spécifique en utilisant l'id
  getImagesParVoiture(voitureId: number): Observable<any> {
    return this.httpClient.get(this.url + 'images/voiture/' + voitureId);
  }

  // Créer une nouvelle image de voiture
  createImageVoiture(imageData: any): Observable<any> {
    return this.httpClient.post(this.url + 'image/voiture/create', imageData);
  }

  // Récupérer les détails d'une image de voiture en utilisant l'id
  getImageVoitureDetail(imageId: number): Observable<any> {
    return this.httpClient.get(this.url + 'image/voiture/'+imageId);
  }

  // Supprimer une image de voiture en utilisant l'id
  deleteImageVoiture(imageId: number): Observable<any> {
    return this.httpClient.delete(this.url + 'image/voiture/delete/'+imageId);
  }
}
