import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Personne } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inscriptionNonReussie:boolean = false;
  erreur: boolean = true;
  user: any;
  message: string = "";
  userData: FormData = new  FormData();
  reservationData: FormData = new FormData()

  constructor(private userService: UsersService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService) { }

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
          this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
            if (params['ajout']) {
              const dateReservationValue = this.cookieService.get('dateReservation');
              const dateRetourValue = this.cookieService.get('dateRetour');
              const voitureIDValue = this.cookieService.get('voiture')

              this.reservationData.append('voiture', voitureIDValue);
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
            }else{
              this.cookieService.set('user', JSON.stringify(this.user))
              this.router.navigate(['/'])
            }
          })
        }
      }
    )
  }
}
