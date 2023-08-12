import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedRole!: string;
  roleClient: any = 2;
  roleProprietaire: any = 1
  registerForm: any
  userData: FormData = new FormData();
  constructor(private userService: UsersService,
    private route: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required])
    })
  }

  get nom(){
    return this.registerForm.get('nom')
  }

  get prenom(){
    return this.registerForm.get('prenom')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get telephone(){
    return this.registerForm.get('telephone')
  }

  register(): void{
    console.log(this.selectedRole)
    if(this.selectedRole === 'Client'){
      this.userData.append('nom', this.registerForm.value.nom);
      this.userData.append('prenom', this.registerForm.value.prenom);
      this.userData.append('email', this.registerForm.value.email);
      this.userData.append('password', this.registerForm.value.password);
      this.userData.append('telephone', this.registerForm.value.telephone);
      this.userData.append('role', this.roleClient);
      this.userService.registerUser(this.userData)
      .subscribe((response)=>{
        console.log(response)
        this.route.navigate(['/login'])
      },
      (error) =>{
        console.log(error)
        this.route.navigate(['/register'])
      })

    }else if(this.selectedRole === 'Proprietaire'){
      this.userData.append('nom', this.registerForm.value.nom);
      this.userData.append('prenom', this.registerForm.value.prenom);
      this.userData.append('email', this.registerForm.value.email);
      this.userData.append('password', this.registerForm.value.password);
      this.userData.append('telephone', this.registerForm.value.telephone);
      this.userData.append('role', this.roleProprietaire);
      this.userService.registerUser(this.userData)
      .subscribe((response)=>{
        console.log(response)
        this.route.navigate(['/login'])
      },
      (error) =>{
        console.log(error)
        this.route.navigate(['/register'])
      })
    }
  }
}
