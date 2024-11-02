import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  url = 'https://jsonplaceholder.typicode.com/users';
  userArray :any[] =[]
  userForm :FormGroup = new FormGroup({
    id : new FormControl(''),
    name :new FormControl(''),
    username : new FormControl(''),
    email : new FormControl('')
  });

  empForm: FormGroup;

  
  
  constructor(private http:HttpClient, private formBuilder:FormBuilder){
    this.getAllUser();
    this.empForm = this.formBuilder.group({
    empId : new FormControl(''),
    empName :new FormControl('',[Validators.required,Validators.minLength(4)]),
    empUsername : new FormControl(''),
    empEmail : new FormControl('')
  //There is no major diffrence in Form Group and FormBuilder both does same work just formbuilder uses angular boiler plate
    })
  }
  

  getAllUser(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
      this.userArray = res;
    })
  }
  

  onSave() {
    debugger;
    const obj = this.userForm.value;
    this.http.post('https://jsonplaceholder.typicode.com/users',obj).subscribe((result:any)=>{
      alert("User created "+result.name)
    })
  }

  onSubmitEmp(){
    const empObj = this.empForm.value;
    this.http.post(this.url,empObj).subscribe((res:any)=>{
      alert("Emp Added Sucessfully"+res.empName)
    })

  }

  onEdit(id:any){
    this.http.get('https://jsonplaceholder.typicode.com/users/'+id).subscribe((res:any)=>{
      this.userForm = new FormGroup({
        id: new FormControl(res.id),
        name :new FormControl(res.name),
        username : new FormControl(res.username),
        email : new FormControl(res.email)
      })
    })
  }
}
