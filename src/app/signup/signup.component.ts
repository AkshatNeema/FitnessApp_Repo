import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(
    private http : HttpClient,
    private fb : FormBuilder
  ){}

  ngOnInit(){
    this.signupForm = this.fb.group({
    userName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    userContact: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',[Validators.required])
  },{validator:this.passwordMatchValidator}
    
   )}


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }



onSubmitSignupForm() {

  const signupData = this.signupForm.value;
  this.http.post('http://localhost:3000/signup',signupData).subscribe(response=>{

    console.log('User Added successfully',response);    
    alert("User Added successfully")
  },error=>{
    if(error.status === 400 && error.error.message("User already registered")){
      alert("User already registered")
    }
    else alert('Signup failed. please try again !');
  });

  // this.router.navigate(['']);

}

}
