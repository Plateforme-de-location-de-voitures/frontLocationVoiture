import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-galeries-voitures',
  templateUrl: './galeries-voitures.component.html',
  styleUrls: ['./galeries-voitures.component.css']
})
export class GaleriesVoituresComponent implements OnInit {

  user: any;

  constructor(private cookieService: CookieService) {
    const userCookie = this.cookieService.get('user');
    this.user = JSON.parse(userCookie);
  }

  ngOnInit(): void {
  }

}
