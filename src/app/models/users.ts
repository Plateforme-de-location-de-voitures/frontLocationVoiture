export class Role {
  id?: number;
  code: string;
  libelle: string;

  constructor() {
    this.code = '';
    this.libelle = '';
  }
}

export class Personne {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;

  constructor() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.telephone = '';
    this.role = new Role();
  }
}

export class Proprietaire extends Personne {
  constructor() {
    super();
  }
}

export class Client extends Personne {
  constructor() {
    super();
  }
}
