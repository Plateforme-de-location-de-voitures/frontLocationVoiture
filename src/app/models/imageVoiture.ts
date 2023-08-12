import { Voiture } from "./voiture";

export class ImageVoiture {
  id: number;
  voiture: Voiture;
  image: string;

  constructor() {
    this.id = 0;
    this.voiture = new Voiture();
    this.image = ''
  }
}
