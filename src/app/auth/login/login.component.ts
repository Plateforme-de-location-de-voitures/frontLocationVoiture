import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Personne } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inscriptionNonReussie:boolean = false;
  erreur: boolean = true;
  user: Personne = new Personne();
  message: string = "";
  userData: FormData = new  FormData();

  constructor(private userService: UsersService,
    private cookieService: CookieService,
    private router: Router) { }

  LoginForm: any;

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  get email(){
    return this.LoginForm.get('email');
  }

  get password(){
    return this.LoginForm.get('password');
  }

  login(): void{
    this.userData.append('email', this.LoginForm.value.email);
    this.userData.append('password', this.LoginForm.value.password);
    this.userService.loginUser(this.userData)
      .subscribe(
        response=>{
          console.log(response.access_token)
          this.cookieService.set('access_token', response.access_token);
          this.getUser();
        }
      )
  }

  getUser(): void{
    this.userService.getCurrentUser()
    .subscribe(
      response=>{
        this.user = response;
        console.log(this.user)
        if(this.user.role.code === 'ROLE_PROPRIETAIRE'){
          this.cookieService.set('user', JSON.stringify(this.user));
          this.router.navigate(['/voitures'])
        }else{
          this.cookieService.set('user', JSON.stringify(this.user))
          this.router.navigate(['/'])
        }
      }
    )
  }
}
