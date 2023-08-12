import { Marque } from "./marque";

export class Modele {
  id?: number;
  nom: string;
  marque: Marque;

  constructor() {
    this.nom = '';
    this.marque = new Marque();
  }
}
