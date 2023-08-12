import { Modele } from "./modele";
import { Proprietaire } from "./users";

export class Voiture {
  id!: number;
  proprietaire: Proprietaire;
  modele: Modele;
  numeroSerie: string;
  vinNumber: string;
  couleur: string;
  prix: number;
  anneeFabrication: number;
  puissance: number;
  imagePrincipal: string;
  statutVoiture: boolean;

  constructor(){
    this.proprietaire  = new Proprietaire();
    this.modele = new Modele();
    this.numeroSerie = '';
    this.vinNumber = '';
    this.couleur = '';
    this.prix = 0;
    this.anneeFabrication = 0;
    this.puissance = 0;
    this.imagePrincipal = '' ;
    this.statutVoiture = true;
  }
}
