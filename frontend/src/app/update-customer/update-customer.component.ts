import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [HttpClientModule,FormsModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {
  
  id:string='';
  customer:any;
  firstname:string='';
  lastname:string='';
  email:string='';

  constructor(private router:Router,private http:HttpClient){
    this.id = history.state.customer_id;
    this.http.get("http://localhost:8080/getcustomer/"+this.id).subscribe((result:any)=>{
      console.log(result);
      this.customer = result;
      this.firstname = this.customer.firstname;
      this.lastname = this.customer.lastname;
      this.email = this.customer.email;
    });
  }

  back(){
    this.router.navigateByUrl("");
  }

  update(){
    let customerData = {
      'firstname': this.firstname,
      'lastname' : this.lastname,
      'email' : this.email
    };
    this.http.patch("http://localhost:8080/updatecustomers/"+this.id,customerData).subscribe(
      (result:any)=>{
        console.log(result);
        alert("Record Updated");
      }
    );
  }
}
