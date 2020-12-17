import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser:Usuario;
  constructor(private authenticationService:AuthenticationService,private router:Router)
  {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x);
  }

  user:Usuario;
  nombre:string;
  ngOnInit() {
    this.user = new Usuario();
    this.user =  this.authenticationService.currentUserValue;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
