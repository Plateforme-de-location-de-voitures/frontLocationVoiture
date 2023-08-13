import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';
import { Voiture } from '../models/voiture';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public reservation: Reservation = new Reservation();
  url!: string;

  // construteur
  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  // Récupérer la liste des réservations
  getReservationsList(): Observable<Array<Reservation>> {
    return this.httpClient.get<Array<Reservation>>(this.url + 'reservations');
  }

  // Créer une nouvelle réservation
  createReservation(reservationData: FormData): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.url + 'reservation/create', reservationData);
  }

  // Recupérer les réservations d'un propriétaire
  getReservationProprietaireList(proprietaireID: number): Observable<Array<Reservation>>{
    return this.httpClient.get<Array<Reservation>>(this.url + 'reservation/proprietaire/' + proprietaireID + '/');
  }

  // Recupérer les réservations d'un client
  getReservationClientList(clientID: number): Observable<Array<Reservation>>{
    return this.httpClient.get<Array<Reservation>>(this.url + 'reservation/client/' + clientID + '/');
  }

  // Recherche de réservations par nom du client
  searchReservationByClientName(nomClient: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(this.url + 'reservation/recherche/' + nomClient);
  }

  // Mettre à jour une réservation existante
  updateReservation(reservationId: number, reservationData: FormData): Observable<Reservation> {
    return this.httpClient.put<Reservation>(this.url + 'reservation/update/' + reservationId + '/', reservationData);
  }

  // Supprimer une réservation en utilisant son ID
  deleteReservation(reservationId: number): Observable<any> {
    return this.httpClient.delete(this.url + 'reservation/delete/' + reservationId);
  }

  // Récupérer les détails d'une réservation en utilisant son ID
  getReservationDetail(reservationId: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(this.url + 'reservation/detail/' + reservationId);
  }

  // Mettre fin à une réservation en utilisant son ID
  finishReservation(reservationId: number): Observable<any> {
    return this.httpClient.put(this.url + 'fin/' + reservationId + '/', {} );
  }

  // Rechercher les voitures disponibles entre deux dates de réservation
  searchAvailableCars(dateReservation: string, dateRetour: string): Observable<Array<Voiture>> {
    return this.httpClient.get<Array<Voiture>>(this.url + 'voiture/disponible/' + dateReservation + '/' + dateRetour + '/');
  }
}
