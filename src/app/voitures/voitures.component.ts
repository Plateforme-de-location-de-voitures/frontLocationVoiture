import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/voiture';
import { VoitureService } from '../services/voiture.service';
import { ModeleService } from '../services/modele.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Modele } from '../models/modele';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {

  showListeVoiture = 1;
  erreur: boolean = true;
  voiture = this.voitureService.voiture;
  voitures: Voiture[] = [];
  modeles: Modele[] = [];
  messageErreur: string = "";
  voitureData: FormData = new  FormData();
  APIEndpoint: string;
  voitureForm: any;
  imageFile: any;
  imagePath: any;
  imgURL: any;
  user: any
  messageSucces: string | null = null;

  constructor(private voitureService: VoitureService,
    private modeleService: ModeleService,
    private cookieService: CookieService
    ) {
      this.APIEndpoint = environment.APIEndpoint;
      const userCookie = this.cookieService.get('user');
      this.user = JSON.parse(userCookie);
  }

  ngOnInit(): void {
    this.initializeForm()
    this.listeVoitures();
    this.listeModeles();
  }

  initializeForm(): void{
    this.voitureForm = new FormGroup({
      modele: new FormControl('', [Validators.required]),
      numeroSerie: new FormControl('', [Validators.required]),
      vinNumber: new FormControl('', [Validators.required]),
      couleur: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
      anneeFabrication: new FormControl('', [Validators.required]),
      puissance: new FormControl('', [Validators.required])
    })
  }

  get modele(){
    return this.voitureForm.get('modele');
  }

  get numeroSerie(){
    return this.voitureForm.get('numeroSerie');
  }

  get vinNumber(){
    return this.voitureForm.get('vinNumber');
  }

  get couleur(){
    return this.voitureForm.get('couleur');
  }

  get prix(){
    return this.voitureForm.get('prix');
  }

  get anneeFabrication(){
    return this.voitureForm.get('anneeFabrication');
  }

  get puissance(){
    return this.voitureForm.get('puissance');
  }

  onShowListe(){
    this.showListeVoiture=1;
  }

  onHideListe(){
    this.showListeVoiture=2;
  }

  onUpdate(id: number){
    this.voitureService.getVoitureDetail(id).subscribe(response=>{
      this.voiture = response;
    })
    this.showListeVoiture=3;
  }

  onDetails(id: number){
    this.voitureService.getVoitureDetail(id).subscribe(response=>{
      this.voiture = response;
    })
    this.showListeVoiture=4;
  }

  listeModeles():void{
    this.modeleService.getModelesList().subscribe(response=>{
      this.modeles = response;
    })
  }

  listeVoitures():void{
    this.voitureService.getVoitureListByProprietaire(this.user.id).subscribe(response=>{
      this.voitures = response;
    })
  }

  ajoutVoiture(): void {
    console.log(this.voitureForm.value.modele.id)
    this.voitureData.append('proprietaire', this.user.id);
    this.voitureData.append('modele', this.voitureForm.value.modele.id);
    this.voitureData.append('numeroSerie', this.voitureForm.value.numeroSerie);
    this.voitureData.append('vinNumber', this.voitureForm.value.vinNumber);
    this.voitureData.append('couleur', this.voitureForm.value.couleur);
    this.voitureData.append('prix', this.voitureForm.value.prix);
    this.voitureData.append('anneeFabrication', this.voitureForm.value.anneeFabrication);
    this.voitureData.append('puissance', this.voitureForm.value.puissance);
    this.voitureData.append('imagePrincipal', this.imageFile);
    this.voitureData.append('statutVoiture', 'false')
    console.log(this.voitureData)
    this.voitureService.createVoiture(this.voitureData).subscribe(
      (response) => {
        console.log(response);
        if(response.id > 0) {
          this.listeVoitures();
          this.onShowListe()
          this.messageSucces = "La voiture a été ajoutée avec succès.";
          setTimeout(() => {
            this.messageSucces = null; // Efface le message après deux secondes
          }, 2000);
        }
        else {
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, voiture déjà existante";
          this.onHideListe();
          this.voiture.numeroSerie = this.voitureForm.value.numeroSerie;
          this.voiture.vinNumber = this.voitureForm.value.vinNumber;
          this.voiture.couleur = this.voitureForm.value.couleur;
          this.voiture.prix = this.voitureForm.value.prix;
          this.voiture.anneeFabrication = this.voitureForm.value.anneeFabrication;
          this.voiture.puissance = this.voitureForm.value.puissance;
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifierVoiture(id: number): void {
    // Mise à jour des données dans this.voitureData
    this.voitureData.append('proprietaire', this.user.id);
    this.voitureData.append('modele', this.voitureForm.value.modele.id);
    this.voitureData.append('numeroSerie', this.voitureForm.value.numeroSerie);
    this.voitureData.append('vinNumber', this.voitureForm.value.vinNumber);
    this.voitureData.append('couleur', this.voitureForm.value.couleur);
    this.voitureData.append('prix', this.voitureForm.value.prix);
    this.voitureData.append('anneeFabrication', this.voitureForm.value.anneeFabrication);
    this.voitureData.append('puissance', this.voitureForm.value.puissance);
    this.voitureData.append('imagePrincipal', this.imageFile);
    this.voitureData.append('statutVoiture', 'false');

    this.voitureService.updateVoiture(id, this.voitureData).subscribe(
      (response) => {
        console.log(response);
        if (response.id > 0) {
          this.listeVoitures();
          this.onShowListe();
          this.messageSucces = "La voiture a été modifiée avec succès.";
          setTimeout(() => {
            this.messageSucces = null; // Efface le message après deux secondes
          }, 2000);
        } else {
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, voiture déjà existante";
          this.onHideListe();
          // Mettre à jour les valeurs de this.voiture avec celles du formulaire
          this.voiture.numeroSerie = this.voitureForm.value.numeroSerie;
          this.voiture.vinNumber = this.voitureForm.value.vinNumber;
          this.voiture.couleur = this.voitureForm.value.couleur;
          this.voiture.prix = this.voitureForm.value.prix;
          this.voiture.anneeFabrication = this.voitureForm.value.anneeFabrication;
          this.voiture.puissance = this.voitureForm.value.puissance;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.imageFile = file;

      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/) == null){
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      console.log(file)
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
      this.imgURL = reader.result;
      }
    }
  }

  detailVoiture(id: number): void {
    console.log(id)
    this.voitureService.getVoitureDetail(id).subscribe(response=>{
      this.voiture = response;
    })
  }

  supprimerVoiture(id: number): void {
    console.log(id);
    this.voitureService.deleteVoiture(id).subscribe(
      () => {
        console.log("La voiture a été supprimée avec succès.");
        this.listeVoitures();
        this.onShowListe();
      },
      error => {
        if (error.error.detail === "Impossible de supprimer la voiture car elle est liée à une réservation qui n'est pas terminée.") {
          this.erreur = false;
          this.messageErreur = "Impossible de supprimer la voiture. Elle est liée à une réservation qui n'est pas terminée.";
        } else if (error.status === 404) {
          console.error("La voiture demandée n'a pas été trouvée.");
        } else {
          console.error("Une erreur s'est produite lors de la suppression de la voiture.");
        }
      }
    );
  }

}
