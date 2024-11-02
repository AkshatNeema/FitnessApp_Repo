import { Component } from '@angular/core';
import { AutherService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  title : String ="";
  calculated_BMI: number = 0;
  bmiCalculated: boolean = false;
  
  

  constructor(
    private router:Router,
    private autherservice: AutherService,
    private fb:FormBuilder
  ){}

  ngOnInit(){
    this.title = this.autherservice.getUsersName();
  }

  bmiForm:FormGroup= new FormGroup({
    height_input : new FormControl('',[Validators.required,Validators.min(92),Validators.max(242)]),
    weight_input : new FormControl('',[Validators.required,Validators.min(20),Validators.max(350)])
  })
  
  CalculateBMI() {
    const height = this.bmiForm.get('height_input')?.value;
    const weight = this.bmiForm.get('weight_input')?.value;
    
    if(height&&weight){
      const heightInMeters =height/100;
      this.calculated_BMI =  Math.round((weight/(heightInMeters*heightInMeters))*100)/100;

      alert("your height is "+height+" your weight is " +weight  +" Yor Bmi is "+this.calculated_BMI);
      this.bmiCalculated = true
    }
    else alert("Enter Vaild Height and Weight")

    }
  
  Loose(){
    window.open("https://www.lybrate.com/topic/diet-chart-for-weight-loss")
  }
  Gain(){
    window.open("https://www.lybrate.com/topic/weight-gain-diet-chart")
  }
  
  onSubmit() {

    console.log("Login Form Submitted");
    
  //   var bmi = (this.weight)/(height*height*0.0001);
  // bmi = Math.round(bmi*100)/100
  //     if (height !==null && weight !==null ) {
  //         // alert("your height is "+height+" your weight is " +weight  +" Yor Bmi is "+bmi);
  //         var bmioutputbox = document.getElementById("Hidden-Calulated_BMI_TextField");
  //         bmioutputbox.style.display ='flex';

  //         if(bmi<=18.5){
  //             bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You are UnderWeight";
  //             bmioutputbox.style.backgroundColor = 'yellow';
  //         }

  //         else if(bmi>18.5 && bmi<25){
  //             bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You have healthy BMI";
  //             bmioutputbox.style.backgroundColor = 'lightgreen';
  //         }

  //         else if( bmi>=25){
  //             bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You are OverWeight";
  //             bmioutputbox.style.backgroundColor = 'Red';
  //         }
  //     }
  //     else{
  //         alert("Please provide deatils")
  //     }

  }
}



























// document.getElementById("heightTextField").addEventListener("change", function() {
//   let v = parseFloat(this.value);
//   if (v < 92){
//    this.value = "";
//    alert("Height Should be between 3 to 7 feet(91.44 cm to 213.96 cm)");
//   }    
//   if (v > 214) {
//       this.value = "";
//       alert("Height Should be between 3 to 7 feet(91.44 cm to 213.96 cm)");
//   }
// });

// document.getElementById("weightTextField").addEventListener("change", function() {
// let v = parseFloat(this.value);
// if (v < 20){
//   this.value = "";
//   alert("Weight Should be between 20 to 350 kgs");
// }    
// if (v > 350) {
//   this.value = "";
//   alert("Weight Should be between 20 to 350 kgs");
// }
// });

// var bmi =0;
// document.getElementById("submitButton").addEventListener("click", function() {
// // function calculateBMI(){
//   // var form = document.getElementById('bmiForm');
//   console.log("calulating bmi")
//   var height = document.getElementById('heightTextField').value;
//   var weight = document.getElementById('weightTextField').value;
   
//   var bmi = (weight)/(height*height*0.0001);
//   bmi = Math.round(bmi*100)/100
//       if (height !==null && weight !==null ) {
//           // alert("your height is "+height+" your weight is " +weight  +" Yor Bmi is "+bmi);
//           var bmioutputbox = document.getElementById("Hidden-Calulated_BMI_TextField");
//           bmioutputbox.style.display ='flex';

//           if(bmi<=18.5){
//               bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You are UnderWeight";
//               bmioutputbox.style.backgroundColor = 'yellow';
//           }

//           else if(bmi>18.5 && bmi<25){
//               bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You have healthy BMI";
//               bmioutputbox.style.backgroundColor = 'lightgreen';
//           }

//           else if( bmi>=25){
//               bmioutputbox.value = 'Your Bmi is '+ bmi +"\n You are OverWeight";
//               bmioutputbox.style.backgroundColor = 'Red';
//           }
//       }
//       else{
//           alert("Please provide deatils")
//       }
      
// });

