import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  firstname:string="";
  lastname:string="";
  email:string="";

  constructor(private router:Router,private http:HttpClient){

  }
  
  back(){
    this.router.navigateByUrl('');
  }

  save(){
        let customer = {
          "firstname":this.firstname,
          "lastname":this.lastname,
          "email":this.email
        }
        
        this.http.post("http://localhost:8080/addcustomers",customer).subscribe(
          (customer:any)=>{
              console.log(customer);
          }
        );

        this.firstname='';
        this.lastname='';
        this.email='';
        alert("Record Added");
  }
}
