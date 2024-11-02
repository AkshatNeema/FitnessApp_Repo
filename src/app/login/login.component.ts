import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutherService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  pmsg: any;
  smsg: any;
  emsg: any;
  activeTab: any;
  showProjects: any;
  isAdminSelected: any;
  isUserSelected: any;
  


  constructor(
    private authservice : AutherService,
    private router: Router,
    private http : HttpClient
  ){}
  

loginForm: FormGroup = new FormGroup({
  userName : new FormControl('',Validators.required),
  password : new FormControl('',[Validators.required,Validators.minLength(6)])
});

gotosignup() {
  this.router.navigate(['/signup']);
}


onSubmitLoginForm() {
  if(this.loginForm.invalid){
    return;
  }

  const loginData = this.loginForm.value;
  this.http.post('http://localhost:3000/login',loginData).subscribe(response=>{
    this.smsg = response;
    console.log('login successfull',response);    
    alert("login Successfull");

    this.authservice.setUsersName(this.loginForm.get('userName')?.value);
    this.router.navigate(['/home']);

  },error=>{
    this.emsg = error;
    console.log('Login failed');
  });
  
}

}
