import { Client } from "./users";
import { Voiture } from "./voiture";

export class Reservation {
  id!: number;
  dateReservation: Date;
  dateRetour: Date;
  statutReservation: boolean;
  client: Client;
  voiture: Voiture;

  constructor() {
    this.dateReservation = new Date();
    this.dateRetour = new Date();
    this.statutReservation = false;
    this.client = new Client();
    this.voiture = new Voiture();
  }
}
