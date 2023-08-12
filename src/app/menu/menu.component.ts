import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggin: boolean = false
  APIEndpoint: any
  user: any
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      this.isLoggin = true
      this.user = JSON.parse(userCookie);
    } else {
       this.isLoggin = false
    }
  }

}
