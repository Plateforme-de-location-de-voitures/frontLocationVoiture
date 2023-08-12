import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggin: boolean = false
  user: any
  constructor(private userService: UsersService,
    private route: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      this.isLoggin = true
      this.user = JSON.parse(userCookie);
    } else {
       this.isLoggin = false
    }
  }

  logout(): void{
    this.cookieService.delete('access_token');
    this.cookieService.delete('user');
    this.userService.logoutUser()
    this.route.navigate(['/login'])
  }

}
