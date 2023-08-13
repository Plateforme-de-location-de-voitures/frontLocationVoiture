import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  visible = 0;
  user: any;
  reservations: Reservation[] = [];
  reservationData: FormData = new FormData();
  APIEndpoint: any;
  reservationForm: any;
  reservation = this.reservationService.reservation;
  erreur: boolean = false;
  message: string = '';
  affichage: number = 0;

  constructor(
    private cookieService: CookieService,
    private reservationService: ReservationService
  ) {
    this.APIEndpoint = environment.APIEndpoint;
    const userCookie = this.cookieService.get('user');
    this.user = JSON.parse(userCookie);
  }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      dateReservation: new FormControl('', [Validators.required]),
      dateRetour: new FormControl('', [Validators.required]),
    });

    if (this.user.role.code === 'ROLE_PROPRIETAIRE') {
      this.reservationProprietaireList();
    } else if (this.user.role.code === 'ROLE_CLIENT') {
      this.reservationClientList();
    }
  }

  get dateReservation() {
    return this.reservationForm.get('dateReservation');
  }

  get dateRetour() {
    return this.reservationForm.get('dateRetour');
  }

  reservationProprietaireList(): void {
    this.reservationService.getReservationProprietaireList(this.user.id)
      .subscribe((response) => {
        this.reservations = response;
      });
  }

  reservationClientList(): void {
    this.reservationService.getReservationClientList(this.user.id)
      .subscribe((response) => {
        this.reservations = response;
      });
  }

  affichageFormulaire(id: number): void {
    this.affichage = 3;
    this.reservationService.getReservationDetail(id)
      .subscribe((response) => {
        this.reservation = response;
      });
  }

  modifierReservation(id: number, voitureID: any): void {
    this.affichage = 0;
    const dateReservationValue = this.reservationForm.value.dateReservation;
    const dateRetourValue = this.reservationForm.value.dateRetour;

    const conflictingReservation = this.reservations.find(reservation => {
      const reservationDateReservation = reservation.dateReservation;
      const reservationDateRetour = reservation.dateRetour;

      if (
        (dateReservationValue >= reservationDateReservation && dateReservationValue <= reservationDateRetour) ||
        (dateRetourValue >= reservationDateReservation && dateRetourValue <= reservationDateRetour) ||
        (dateReservationValue <= reservationDateReservation && dateRetourValue >= reservationDateRetour)
      ) {
        return true;
      }

      return false;
    });

    if (conflictingReservation) {
      this.erreur = true;
      this.affichage = 3;
      this.message = 'Les dates sélectionnées coïncident avec une réservation existante.';
    } else if (this.compareDates(dateReservationValue, dateRetourValue) === -1) {
      this.reservationData.append('dateReservation', dateReservationValue);
      this.reservationData.append('dateRetour', dateRetourValue);
      this.reservationData.append('client', this.user.id);
      this.reservationData.append('voiture', voitureID);
      this.reservationData.append('statutReservation', 'false');

      this.reservationService.updateReservation(id, this.reservationData)
        .subscribe(() => {
          this.reservationClientList();
        });
    } else if (this.compareDates(dateReservationValue, dateRetourValue) === 1) {
      this.erreur = true;
      this.affichage = 3;
      this.message = 'La date de réservation ne doit pas être supérieure à la date de retour.';
    } else {
      this.erreur = true;
      this.affichage = 3;
      this.message = 'La date de réservation ne doit pas être égale à la date de retour.';
    }
  }


  /*modifierReservation(id: number, voitureID: any): void {
    this.affichage = 0;
    const dateReservationValue = this.reservationForm.value.dateReservation;
    const dateRetourValue = this.reservationForm.value.dateRetour;

    if (this.compareDates(dateReservationValue, dateRetourValue) === -1) {
      this.reservationData.append('dateReservation', dateReservationValue);
      this.reservationData.append('dateRetour', dateRetourValue);
      this.reservationData.append('client', this.user.id);
      this.reservationData.append('voiture', voitureID);
      this.reservationData.append('statutReservation', 'false');

      this.reservationService.updateReservation(id, this.reservationData)
        .subscribe(() => {
          this.reservationClientList();
        });
    } else if (this.compareDates(dateReservationValue, dateRetourValue) === 1) {
      this.erreur = true;
      this.affichage = 3;
      this.message = 'La date réservation ne doit pas être supérieure à la date retour';
    } else {
      this.erreur = true;
      this.affichage = 3;
      this.message = 'La date réservation ne doit pas être égale à la date retour';
    }
  }*/

  compareDates(date1: Date, date2: Date): number {
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }

  detailReservation(id: number): void {
    this.affichage = 1;
    this.reservationService.getReservationDetail(id)
      .subscribe((response) => {
        this.reservation = response;
      });
  }

  retour(): void {
    this.affichage = 0;
  }

  annulerReservation(id: number): void {
    // TODO: Implement annulerReservation method
  }

  finirReservation(id: number): void{
    this.reservationService.finishReservation(id)
      .subscribe((response)=>{
        console.log(response)
        this.reservationProprietaireList()
      })
  }

}
