import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { Voiture } from '../models/voiture';
import { environment } from 'src/environments/environment';
import { VoitureService } from '../services/voiture.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  isLoggin: boolean = false
  affichage = 1;
  rechercheDateForm : any
  voituresParMarque: Voiture[]=[]
  voitures: Voiture[]=[]
  reservationData: FormData = new FormData();
  APIEndpoint: any
  message: string = ''
  erreur: boolean = false;
  voiture = this.voitureService.voiture;
  user: any;
  marque: string = ''
  constructor(private voitureService: VoitureService,
    private reservationService: ReservationService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.APIEndpoint = environment.APIEndpoint;
  }

  ngOnInit(): void {
    this.initRechercheDateForm();
    this.initUser();
  }

  initRechercheDateForm(): void {
    this.rechercheDateForm = new FormGroup({
      dateReservation: new FormControl('', [Validators.required]),
      dateRetour: new FormControl('', [Validators.required])
    });
  }

  initUser(): void {
    const userCookie = this.cookieService.get('user');
    this.isLoggin = !!userCookie;
    this.user = this.isLoggin ? JSON.parse(userCookie) : null;
  }

  get dateReservation(){
    return this.rechercheDateForm.get('dateReservation')
  }

  get dateRetour(){
    return this.rechercheDateForm.get('dateRetour')
  }

  onRecherche(){
    const dateReservationValue = this.rechercheDateForm.value.dateReservation;
    const dateRetourValue = this.rechercheDateForm.value.dateRetour;
    if(this.compareDates(dateReservationValue, dateRetourValue) === -1){
      this.cookieService.set('dateReservation', dateReservationValue)
      this.cookieService.set('dateRetour', dateRetourValue)
      this.affichage = 2

      this.reservationService.searchAvailableCars(dateReservationValue, dateRetourValue)
      .subscribe(
        (response)=>{
          this.voitures = response;
        }
      )
    }else if(this.compareDates(dateReservationValue, dateRetourValue) === 1){
      this.erreur = true;
      this.affichage = 1;
      this.message = "La date réservation ne doit pas être supérieure à la date retour"
    }else{
      this.erreur = true
      this.affichage = 1;
      this.message = "La date réservation ne doit pas être égale à la date retour"
    }
  }

  onRetourPrincipale(){
    this.affichage = 1
  }

  retourRecherche(){
    this.affichage = 2
  }

  onRetourVoiture(){
    this.affichage = 2
  }

  onDetails(id: number) {
    this.voitureService.getVoitureDetail(id).subscribe(response => {
      this.voiture = response;
    });
    this.affichage = 3;
  }

  voitureParMarque() {
    const tempVoituresParMarque: Voiture[] = [];
    for (const voiture of this.voitures) {
      if (voiture.modele.marque.nom.toLowerCase() === this.marque.toLowerCase()) {
        tempVoituresParMarque.push(voiture);
      }
    }
    this.voituresParMarque = tempVoituresParMarque;
    this.marque = '';
    this.affichage = 4;
  }

  compareDates(date1: Date, date2: Date): number {
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }

  reserver(id: any): void {
    if (this.isLoggin) {
      const dateReservationValue = this.cookieService.get('dateReservation');
      const dateRetourValue = this.cookieService.get('dateRetour');

      this.reservationData.append('voiture', id);
      this.reservationData.append('client', this.user.id);
      this.reservationData.append('dateReservation', dateReservationValue);
      this.reservationData.append('dateRetour', dateRetourValue);
      this.reservationData.append('statutReservation', 'false');

      this.reservationService.createReservation(this.reservationData)
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/reservations']);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.cookieService.set('voiture', id)
      this.router.navigate(['/login'], { queryParams: { ajout: true } });
    }
  }

}
