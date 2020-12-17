import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { error } from 'console';
import { first } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { MenuComponent } from 'src/app/Components/menu/menu.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentItem : string;
  loginForm:FormGroup;
  loading=false;
  submitted=false;
  returnUrl:string;
  content:MenuComponent;
  constructor(private formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private authenticationService:AuthenticationService,
              private modalService:NgbModal) {
                if(this.authenticationService.currentUserValue){
                  this.router.navigate(['/']);
                }
               }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
      
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return ;
    }
    this.loading = true;
    this.authenticationService.login(this.f.userName.value,this.f.password.value).pipe(first()).subscribe(
      data => {
        
        if (data.tipo == "admin") {
          this.router.navigate(['/asignaturasAdd']);
          
        }
        if (data.tipo == "docente") {
          this.router.navigate(['/solicitar']);
        }
        if (data.tipo == "monitor") {
          this.router.navigate(['/solicitudes']);
        }
      },
      error => {
        const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.title = 'Acceso Denegado';
        modalRef.componentInstance.message = error.error;
        this.loading = false;       
      }
    )
  }
}
